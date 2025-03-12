import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";

function NoteComponent(props) {
  const context = useContext(noteContext);
  const { notes, deleteNote } = context;
  return (
    <>
      <div className="container row mb-5">
        {notes.map((element) => {
          return (
            <div key={element._id} className="card col-lg-5 col-md-5 mt-4 mx-2">
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Tag:{element.tag}
                </h6>
                <p className="card-text">{element.content}</p>
                <div className="d-flex justify-content-between">
                  <i
                    className="fa-solid fa-trash-can"
                    style={{
                      color: "red",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteNote(element._id)}
                  ></i>
                  <i
                    className="fa-regular fa-pen-to-square"
                    style={{
                      color: "blue",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      props.updateNote(element);
                    }}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default NoteComponent;
