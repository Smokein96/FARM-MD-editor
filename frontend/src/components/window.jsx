import { useState,useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";


export function Window({note, updateNote}) {

    const [clicked, setClicked] = useState(false)
    
    useEffect(() => {
        setClicked(false)
    },[note])

    if (!note){
        return<div className="bg-teal-700 w-screen text-center p-6 font-bold text-2xl font-mono text-amber-50">
                Select a note
            </div>
    }
    
    return (
        <div className="bg-teal-700 w-screen h-screen text-amber-50 font-mono p-6">

            {clicked ? (
                <>
                    <div className="flex justify-between items-center mb-6">

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

                        <button
                            onClick={() => setClicked(false)}
                            className="px-4 py-2 bg-teal-900 rounded hover:bg-teal-800"
                        >
                            Save
                        </button>

                    </div>

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
                    <div className="flex justify-between items-center mb-6">

                        <h1 className="text-6xl font-bold">
                            {note.title}
                        </h1>

                        <button
                            onClick={() => setClicked(true)}
                            className="px-4 py-2 bg-teal-900 rounded hover:bg-teal-800"
                        >
                            Edit
                        </button>

                    </div>

                    <div className="prose prose-invert max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {note.content}
                        </Markdown>
                    </div>
                </>
            )}

        </div>
    );
}