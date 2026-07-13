from DB.config import collection
from DB.schemas import individual_data
from DB.models import Note

base_note : Note = {"title" : "untitled",
                            "content" : "Empty"}

reply = collection.insert_one(base_note)
print({
            "id": str(reply.inserted_id),
            "title": base_note["title"],
            "content": base_note["content"],
        }
)
