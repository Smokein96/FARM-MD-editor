
export function Sidebar({notes ,setSelected}){
    return <>

    {/* overall BG */}
    <div className="bg-teal-800 text-white font-mono w-50 h-screen flex flex-col overflow-y-auto"> 
        
        {/* Top lip */}
        <div className="bg-teal-900 text-center p-2 font-bold text-xl ">
            Note Master
        </div>  

        {/* list items */}
        <div className="text-center p-2">
        {notes.map((note) => (

            <div key={note.id} 
                onClick={() =>{
                    setSelected (note)
                }}
                
                className="p-1 m-3 cursor-pointer 
                            border border-transparent rounded-sm transition-all duration-200 
                            hover:border-amber-50 hover:rounded-2xl hover:bg-teal-900">
                <h2>{note.title}</h2>
            </div>
        ))}

        {/* spacing  */}
        <div className="h-10"></div>

        </div>

        {/* Button */}
        <div className="p-1 m-3 fixed bottom-1 left-1 w-42 text-center cursor-pointer
                        bg-teal-700 drop-shadow-xl/50 border rounded-sm transition-all duration-200 
                         hover:border-amber-50 hover:rounded-2xl hover:bg-teal-800 hover:drop-shadow-teal-500/50">
            
            +
        </div>
    </div>
    </>
}