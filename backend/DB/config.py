from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

from DB.schemas import individual_data

load_dotenv()
uri = os.getenv("MONGODB_URI")


client = MongoClient(uri, server_api=ServerApi("1"))

DB = client.farm

collection = DB["notes"]

