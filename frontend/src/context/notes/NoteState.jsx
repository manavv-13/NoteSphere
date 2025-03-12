import React, { useContext, useState } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alerts/alertContext";

const NoteState=(props)=>{
  const context = useContext(alertContext);
  const {setAlert}=context;
  const host = "http://localhost:3000";

      const [notes,setNotes]=useState([]);

      //fetch all notes
      const getNotes =async()=>{
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setNotes(json);
      }
      //Add Note
      const addNote=async (title,content,tag)=>{

        const response = await fetch(`${host}/api/notes/addNote`, {
          method: "POST",
          body: JSON.stringify({
            "title":title,
            "content" : content,
            "tag":tag
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
        });
        const json = await response.json();
        if(json.success){
          const note=json.newNote;
          setNotes(notes.concat(note));
          setAlert(json.msg);
        }
        else{
          setAlert(json.msg);
        }

      }
      //Delete Note
      const deleteNote= async(id)=>{
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
        });
        const json = await response.json();
        if (json.success) {
          const newNotes = notes.filter((note)=>{return note._id!==id});
          setNotes(newNotes);
          setAlert(json.msg);
        }else{
          setAlert(json.msg);
        }

      }

      
      //Edit Note
      const editNote= async (id,title,content,tag)=>{

        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            "title":title,
            "content" : content,
            "tag":tag
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
        });
        const json = await response.json();

        if(json.success){
          let newNotes = JSON.parse(JSON.stringify(notes));
          for (let index = 0; index <newNotes.length; index++) {
            if(newNotes[index]._id===id){
              newNotes[index].title = title;
              newNotes[index].content = content;
              newNotes[index].tag=tag;
              break;
            }
          }
          setNotes(newNotes)
          setAlert(json.msg);
        }else{
          setAlert(json.msg);
        }
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;