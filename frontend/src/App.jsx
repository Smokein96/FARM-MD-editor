import { useState, useEffect } from 'react'

import { Sidebar } from "./components/sidebar.jsx"
import { Window } from "./components/window.jsx"
import { ToastContainer, toast } from 'react-toastify';

import { get_all, make_note, delete_note, update_note } from "./api_calls.js"


function App() {

  const [notes, setNotes] = useState([])

  const [selectedNote, setselectedNote] = useState(null)

  const notify = (message) => {
    toast(message)
  }

  useEffect(() => {
    load_Notes();
    notify("Notes loaded successfully");
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

      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setselectedNote(newNote);

      notify("New note created successfully");
    } catch (e) {
      console.error(e);
      notify("Server failed to create a new note");
    }
  }

  async function deleteNote(id) {
    try {
      await delete_note(id);

      await load_Notes();
      setselectedNote(null);
      notify("Deleted successfully");

    } catch (e) {
      notify("Error during deleting");
    }
  }

  async function updateServer(id, note){
    try{
      await update_note(id,note);

      await load_Notes();
      
      notify("note updated")
    } catch(e){
      notify("error while updating")
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
