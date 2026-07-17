import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import { Sidebar } from "../components/sidebar.jsx"
import { Window } from "../components/window.jsx"
import { ToastContainer, toast } from 'react-toastify';

import { get_all, make_note, delete_note, update_note } from "../api/app_api.js"


function App() {

  const navigate = useNavigate()

  const [notes, setNotes] = useState([])

  const [selectedNote, setselectedNote] = useState(null)

  const notify = (message) => {
    toast(message)
  }

useEffect(() => {
      load_Notes()
        .then(() => notify("connection established"))
        .catch((e) => { navigate("*",{
            state:{
                    status_code: e.status_code,
                    error : e.message
                }
            }) 
          })
  }, []);

  async function load_Notes() {
    try {
      const result = await get_all();
      setNotes(result);

    } catch (e) {
      throw e;
    }
  }

  function updateNote(updatedNote) {
    setNotes(
      notes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    )
    setselectedNote(updatedNote)
  }

  async function addNote() {

    try {
      const newNote = await make_note();
      
      await notify("New note created successfully");

      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setselectedNote(newNote);

    } catch (e) {
      notify(`Server failes to add notes \n ${e.message}`);
    }
  }

  async function deleteNote(id) {
    try {
      await delete_note(id);

      await load_Notes();

      setselectedNote(null);

      notify("Deleted successfully");

    } catch (e) {
      notify(`Error during deleting ${e.message}`);
    }
  }

  async function updateServer(id, note){
    try{
      await update_note(id,note);
      
      
      await load_Notes();
      notify("note updated")
      
      
    } catch(e){
      notify(`error while updating \n ${e.message}`)
    }
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
      />

      <div className='flex'>
        <Sidebar notes={notes} setSelected={setselectedNote} addNote={addNote} />
        <Window note={selectedNote} updateNote={updateNote} deleteNote={deleteNote} updateServer={updateServer}/>
      </div>
    </>
  )
}

export default App
