from pydantic import BaseModel

class Note (BaseModel):
    title : str
    content : str

class User (BaseModel):
    username: str
    password: str