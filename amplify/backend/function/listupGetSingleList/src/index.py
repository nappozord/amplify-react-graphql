import sys
import logging
import pymysql
import json
import random
import boto3
import datetime
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


def check_product_not_exist(product, cur):
    return True


def post_product(list, product, cur, con):
    idcategory = product['idcategory']
    name = product['name']
    picture = product['picture']
    description = product['description']
    url = product['url']
    price = product['price']
    quantity = product['quantity']
    idproduct = 0
    if check_product_not_exist(product, cur):
        sql_string = f"insert into products " \
                     f"(idcategory, name, picture, description, url, price)" \
                     f" values('{idcategory}'," \
                     f"'{name}'," \
                     f"'{picture}'," \
                     f"'{description}'" \
                     f"'{url}'," \
                     f"'{price}'" \
                     f")"
        cur.execute(sql_string)
        idproduct = cur.lastrowid
        print(idproduct)
        con.commit()
    if idproduct != 0:
        sql_string = f"insert into list_product "\
                     f"(idlist, idproduct, quantity) " \
                     f"values('{idlist}'," \
                     f"'{idproduct}'," \
                     f"'{quantity}'" \
                     f")"
        cur.execute(sql_string)
        con.commit()

def handler(event, context):
    datetime_format = '%Y-%m-%d %H:%M:%S'
    """
    This function creates a new RDS database table and writes records to it
    """

    email = event['pathParameters']['email']
    list = event['pathParameters']['list']
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
        '''
        if method == 'GET':
            sql_string = f"select l.idlists, l.idcategory, l.created_date, l.name, l.description, l.picture " \
                         f"from lists l, users u where l.iduser = u. idusers and u.email = '{email}'"
            cur.execute(sql_string)
            dataset = cur.fetchall()
            for set in dataset:
                set['created_date'] = set['created_date'].strftime(datetime_format)
            print(dataset)
            response['body'] = json.dumps(dataset)
        '''
        if method == 'POST':
            print(event['body'])
            product = json.loads(event['body'])
            post_product(email, list, product, cur, conn)

        print(event)

        return response