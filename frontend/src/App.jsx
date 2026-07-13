import { useState,useEffect } from 'react'
import {Sidebar} from "./components/sidebar.jsx"
import {Window} from "./components/window.jsx"
import {testNotes} from "./testset.js"

function App() {
  const [notes, setNotes] = useState(testNotes)

  const [selectedNote, setselectedNote] = useState(null)


  function updateNote(updatedNote){
    setNotes  (
      notes.map((note) => 
        note.id === updatedNote.id ? updatedNote : note
      )
    )
    setselectedNote(updatedNote)
  }
      

  return (
    <>
    <div className='flex'>
      <Sidebar notes={notes} setSelected={setselectedNote}/>
      <Window note={selectedNote} updateNote={updateNote}/>
    </div>
    </>
  )
}

export default App
