import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteComponent from "./NoteComponent";
import { useNavigate } from "react-router-dom";

function Notes() {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const {getNotes, editNote } = context;
  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    econtent: "",
    etag: "default",
  });

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
  }, []);

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({
      id: currNote._id,
      etitle: currNote.title,
      econtent: currNote.content,
      etag: currNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.econtent, note.etag);
    closeRef.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="econtent" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="econtent"
                    name="econtent"
                    rows="3"
                    onChange={onChange}
                    value={note.econtent}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <NoteComponent updateNote={updateNote}/>
    </>
  );
}

export default Notes;
