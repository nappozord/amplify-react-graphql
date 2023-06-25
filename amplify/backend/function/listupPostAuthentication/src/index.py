import sys
import logging
import pymysql
import json
import random
import boto3
from botocore.exceptions import ClientError

secret_name = "listup/MySQL"
region_name = "eu-north-1"

# Create a Secrets Manager client
session = boto3.session.Session()
client = session.client(
    service_name='secretsmanager',
    region_name=region_name
)

try:
    get_secret_value_response = client.get_secret_value(
        SecretId=secret_name
    )
except ClientError as e:
    # For a list of exceptions thrown, see
    # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    raise e

# Decrypts secret using the associated KMS key.
secret = json.loads(get_secret_value_response['SecretString'])

print(secret)

# rds settings
rds_host = secret['host']
user_name = secret['username']
password = secret['password']
db_name = secret['dbname']

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
    conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, db=db_name, connect_timeout=5,
                           cursorclass=pymysql.cursors.DictCursor)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def handler(event, context):
    print(event)
    """
    This function creates a new RDS database table and writes records to it
    """
    user = event['request']['userAttributes']
    email = user["email"]
    google = user["cognito:user_status"]

    print(event['request'])

    with conn.cursor() as cur:
        sql_string = f"select email, google_connected from users where email = '{email}'"
        cur.execute(sql_string)

        dataset = cur.fetchall()

        print(dataset)
        print(len(dataset))

        if len(dataset) == 0:
            if google == 'EXTERNAL_PROVIDER':
                username = user['nickname']
                given_name = user['given_name']
                family_name = user['family_name']
                picture = user['picture']
                sql_string = f"insert into users (email, username, given_name, family_name, picture, google_connected) values('{email}', '{username}', '{given_name}', '{family_name}', '{picture}', 1)"
                cur.execute(sql_string)
            else:
                sql_string = f"insert into users (email, google_connected) values('{email}', 0)"
                cur.execute(sql_string)
            conn.commit()
        else:
            if google == 'EXTERNAL_PROVIDER' and dataset[0]['google_connected'] == '0':
                given_name = user['given_name']
                family_name = user['family_name']
                picture = user['picture']
                sql_string = f"update users set given_name = '{given_name}', family_name = '{family_name}', picture = '{picture}', google_connected = 1 where email = '{email}'"
                cur.execute(sql_string)
                conn.commit()

        print(event)

        return event