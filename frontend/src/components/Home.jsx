import React, { useContext } from "react";
import { Link } from "react-router";
import Notes from "./Notes";
import alertContext from "../context/alerts/alertContext";


function Home() {
  const context = useContext(alertContext);
  const {msg} = context;
  return (
    <>
    <div className="container my-3">
    {msg && 
          <div className="alert alert-info" role="alert">
            {msg}
          </div>
    }
    </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h1 className="text-white">NoteSphere</h1>
        <p className="text-white">A Single Place for all your Notes!</p>
        <div className="p-2">
          <Link to="/addNote">
            <button type="button" className="btn btn-info mx-4">
              Create New Note &rarr;
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="container mt-4">
        <h1 className="text-white">Your Notes!</h1>
        <Notes/>
      </div>
    </>
  );
}

export default Home;
