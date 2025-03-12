import React, { useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alerts/alertContext";
import "../App.css";

function Navbar(props) {
  const navigate = useNavigate();
  const context = useContext(alertContext);
  const {setAlert} = context;
  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setToken(null); // Update state
    navigate("/login");
    setAlert("Logout Successfull!")
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
          <i className="fa-solid fa-note-sticky mx-2" style={{color:"white"}}></i>
            NoteSphere
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form>
                  <Link to="/login">
                    <button type="button" className="btn btn-outline-info mx-1">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button type="button" className="btn btn-outline-info mx-1">
                      Sign-Up
                    </button>
                  </Link>
            </form>:<button onClick={handleLogout} type="button" className="btn btn-outline-info">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
