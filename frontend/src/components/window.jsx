import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'; {/* for rendering markdown */ }
import remarkGfm from "remark-gfm"; {/* for git like markdown */ }


export function Window({ note, updateNote, deleteNote, updateServer }) {

    const [clicked, setClicked] = useState(false); {/* to set the edit and save state */ }

    useEffect(() => {
        {/* reset the value of clicked when new note id is selected */ }
        setClicked(false)
    }, [note ? note.id : null]); {/* earlier set to note, reseted everytime the onChange event was called */ }

    if (!note) {
        {/* if note === null */ }
        return <div className="bg-teal-700 w-screen text-center p-6 font-bold text-2xl font-mono text-amber-50">
            Select a note
        </div>
    }

    return (
        <div className="bg-teal-700 w-screen h-screen text-amber-50 font-mono p-6 overflow-y-auto"> {/* overall BG */}

            {clicked ? (
                <>  {/* conditional for when clicked and not clicked */}
                    <div className="flex justify-between items-center mb-6"> {/* overall div */}

                        {/* take title input if clicked is truthy */}
                        <input

                            className="text-6xl bg-transparent border-none outline-none w-full"
                            value={note.title}
                            maxLength={20}
                            onChange={(e) =>
                                updateNote({
                                    ...note,
                                    title: e.target.value,
                                })
                            }
                        />

                        <div className='flex items-center gap-4'>

                            {/* button for click event */}
                            <button
                                onClick={() => { setClicked(!clicked); updateServer(note._id, note); }}
                                className="px-4 py-2 bg-teal-900 rounded hover:bg-teal-800 "
                            >
                                Save
                            </button>

                            <button
                                onClick={() => { deleteNote(note._id); console.log(note); }}
                                className="px-4 py-2 bg-teal-900 rounded hover:bg-teal-800"
                            >
                                Delete
                            </button>
                        </div>

                    </div>

                    {/* content input */}
                    <textarea
                        className="w-full h-[80vh] bg-transparent outline-none resize-none"
                        value={note.content}
                        onChange={(e) =>
                            updateNote({
                                ...note,
                                content: e.target.value,
                            })
                        }
                    />
                </>

            ) : (

                <>
                    {/* render if clicked is falsy */}
                    <div className="flex justify-between items-center mb-6">

                        <h1 className="text-6xl font-bold">
                            {note.title}
                        </h1>

                        <div className='flex items-center gap-4'>

                            <button
                                onClick={() => setClicked(!clicked)}
                                className="px-4 py-2 bg-teal-900 rounded hover:bg-teal-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteNote(note._id)}
                                className="px-4 py-2 bg-teal-900 rounded hover:bg-teal-800"
                            >
                                Delete
                            </button>
                        </div>

                    </div>

                    <div className="prose prose-invert max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]} >
                            {note.content}
                        </Markdown>
                    </div>
                </>
            )}

        </div>
    );
}