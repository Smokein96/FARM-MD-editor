from fastapi import HTTPException,APIRouter,Depends
from bson import ObjectId

from DB.models import Note
from DB.config import collection_notes
from DB.schemas import all_data

from auth.dependencies import get_current_user

router = APIRouter(
    prefix="/notes" ,
    tags = ["notes"]
)

@router.get("/")
def get_all_notes(current_user = Depends(get_current_user)):
    try:
        all_notes = collection_notes.find()
        return all_data(all_notes)
    
    except Exception as e:
        raise HTTPException(
            status_code = 404,
            detail = f" unable to get notes {e}"
        )

@router.post("/add")
def add_note(current_user = Depends(get_current_user)):
    try:
        base_note : Note = {"title" : "untitled",
                            "content" : "Empty"}
        
        reply = collection_notes.insert_one(base_note)
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
def update_note(id:str, note : Note, current_user = Depends(get_current_user) ):
    try:
        result = collection_notes.update_one(
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
def delete_note(id:str, current_user = Depends(get_current_user)):
    try:
        result = collection_notes.delete_one({"_id" : ObjectId(id)})
    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = f"Unable to delete note: {e}"
        )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code = 404,
            detail = "Note not found"
        )

    return {"message": "note deleted successfully"}

    

