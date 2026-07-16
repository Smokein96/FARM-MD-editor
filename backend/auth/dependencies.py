from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends,HTTPException

from jose import jwt, JWTError

from DB.config import collection_user
from auth.jwt_handler import SECRET_KEY,ALGO

oauth2scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def get_current_user(token: str = Depends(oauth2scheme)):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGO]
        )

        username = payload.get("sub")

        if username is None:
            raise HTTPException(
                status_code=410,
                detail="Invalid token"
            )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    
    db_user = collection_user.find_one({"username" : username})

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )
    
    return {
        "_id" : str(db_user["_id"]),
        "username" : db_user["username"]
    }