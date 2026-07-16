from fastapi import Depends
from fastapi import HTTPException,APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from auth.pass_hash import hash_pass,verify_pass
from auth.jwt_handler import create_access_token

from DB.models import User
from DB.config import collection_user

router = APIRouter(
    prefix = "/auth" ,
    tags = ["Authentication "]
)


@router.post("/setup")
def setup(user : User):
    if collection_user.count_documents({}) > 0:
        raise HTTPException(
            status_code=403,
            detail="Setup has already been completed."
        )
    
    user_send  = {
        "username" : user.username,
        "password" : hash_pass(user.password)
    }
    
    collection_user.insert_one(user_send)

    return{
        "message":"Admin added"
    }


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    db_user = collection_user.find_one( {"username" : form_data.username} )

    if db_user is None :
        raise HTTPException(status_code=401,
                            detail="invalid username or password")
    
    if not verify_pass( form_data.password, db_user["password"] ):
        raise HTTPException(status_code=401, 
                            detail= "invalid username or password" )
    
    token = create_access_token(form_data.username)
    
    return {
        "access_token" : token, 
        "token_type" : "bearer"
    }
    

