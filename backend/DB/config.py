from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
uri = os.getenv("MONGODB_URI")


client = MongoClient(uri, server_api=ServerApi("1"))

DB = client.farm

collection_notes = DB["notes"]
collection_user = DB["user"]

