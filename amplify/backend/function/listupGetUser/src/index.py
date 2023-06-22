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

    email = event['pathParameters']['email']
    method = event['httpMethod']

    response = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH",
            "Access-Control-Allow-Credentials": True,
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "*"
        },
        "body": json.dumps({"message": "Success"}),
        "isBase64Encoded": False,
    }

    with conn.cursor() as cur:
        if method == 'GET':
            sql_string = f"select * from users where email = '{email}'"
            cur.execute(sql_string)
            dataset = cur.fetchone()
            print(dataset)
            response['body'] = json.dumps(dataset)

        elif method == 'POST':
            user = json.loads(event['body'])
            username = user['username']
            given_name = user['given_name']
            family_name = user['family_name']
            picture = user['picture']
            phone = user['phone']
            birth_date = user['birth_date']
            gender = user['gender']
            sql_string = f"update users " \
                         f"set username = '{username}'," \
                         f"given_name = '{given_name}'," \
                         f"family_name = '{family_name}'," \
                         f"picture = '{picture}'," \
                         f"phone = '{phone}'," \
                         f"birth_date = '{birth_date}'," \
                         f"gender = '{gender}'" \
                         f" where email = '{email}'"
            cur.execute(sql_string)
            conn.commit()
            dataset = cur.fetchone()
            print(dataset)
            sql_string = f"select * from users where email = '{email}'"
            cur.execute(sql_string)
            dataset = cur.fetchone()
            print(dataset)
            response['body'] = json.dumps(dataset)
            #response['body'] = json.dumps(event)

        print(event)

        return response