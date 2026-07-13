export async function get_all(){

  try{
    const resp = await fetch("http://127.0.0.1:8000/notes/")
    if (!resp.ok){
      throw new Error(`Response status: ${resp.status}`);
    }
    
    const result = await resp.json();
    return result;
  } catch (e) {
    throw e;
  }
}

export async function make_note() {
    const resp = await fetch("http://127.0.0.1:8000/notes/add", {
        method: "POST",
    });

    if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
    }

    return await resp.json();
}

export async function delete_note(id) {
  const resp = await fetch(`http://127.0.0.1:8000/notes/delete?id=${id}`,
  {method : "DELETE", }
  )

  if (!resp.ok) {
    throw new Error(`Response status: ${resp.status}`);
  }

  return await resp.json();
}

export async function update_note(id, note) {
  const resp = await fetch (`http://127.0.0.1:8000/notes/update?id=${id}`,
    {method : "PUT",
     headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  )

  if (!resp.ok) {
    throw new Error(`Response status: ${resp.status}`);
  }
  
  return await resp.json()
}