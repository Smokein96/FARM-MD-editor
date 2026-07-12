def individual_data(Note):
    """
    Convert a single MongoDB document into a dictionary.
    """
    return {
        "_id": str(Note["_id"]),
        "title": Note["title"],
        "content": Note["content"]
    }

def all_data(Notes):
    """
    Convert a list of MongoDB documents into a list of dictionaries.
    """
    return [individual_data(note) for note in Notes]