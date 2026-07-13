from fastapi import HTTPException,APIRouter
from bson import ObjectId

from DB.models import Note
from DB.config import collection
from DB.schemas import all_data,individual_data

router = APIRouter(
    prefix="/notes" ,
    tags = ["notes"]
)

@router.get("/")
def get_all_notes():
    try:
        all_notes = collection.find()
        return all_data(all_notes)
    except Exception as e:
        raise HTTPException(
            status_code = 404,
            detail = f" unable to get notes {e}"
        )

@router.post("/add")
def add_note():
    try:
        base_note : Note = {"title" : "untitled",
                            "content" : "Empty"}
        
        reply = collection.insert_one(base_note)
        return {
            "_id": str(reply.inserted_id),
            "title": base_note["title"],
            "content": base_note["content"],
        }


    except Exception as e:
        raise HTTPException(
            status_code = 404,
            detail = f" unable to add note {e}"
        )

@router.put("/update")
def update_note(id:str,note : Note):
    try:
        result = collection.update_one(
            {"_id" : ObjectId(id)},
            {
                "$set" : {
                    "title" : note.title,
                    "content" : note.content
                }
            }
        )
        return note

    except Exception as e:
        raise HTTPException(
            status_code = 404,
            detail = f" unable to update note {e}"
        )
    
@router.delete("/delete")
def delete_note(id:str):
    try:
        result = collection.delete_one({"_id" : ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code = 404,
                detail = "note not found"
            )
        else:
            return {"message": "note deleted successfully"}

    except Exception as e:
        raise HTTPException(
            status_code = 404,
            detail = f" unable to delete note {e}"
        )

    

