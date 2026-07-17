from jose import jwt
from datetime import datetime, timedelta, UTC
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGO = os.getenv("ALGO")

ACCESS_TOKEN_EXPIRY_TIME = 15

def create_access_token(username: str):

    expire = datetime.now(UTC) + timedelta(
        minutes = ACCESS_TOKEN_EXPIRY_TIME
    )

    payload = {
        "sub" : username,
        "exp" : expire
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm= ALGO
    )

    return token
    