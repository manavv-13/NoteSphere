import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note,setNote] = useState({title:"",content:"",tag:"default"});

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.content,note.tag);
    navigate("/");
  }
  const onChange=(e)=>{
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-white mb-3">ADD A NEW NOTE!</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-white">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
            <div className="invalid-feedback">Title is Required!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label text-white">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="3"
              onChange={onChange}
              required
            ></textarea>
            <div className="invalid-feedback">Content is Required!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label text-white">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Note &rarr;
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
