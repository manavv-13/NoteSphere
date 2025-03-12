import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import AddNote from "./components/AddNote";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/alerts/AlertState";
import { useState,useEffect} from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <>
    <AlertState>
     <NoteState>
      <BrowserRouter>
      <Navbar setToken={setToken} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addNote" element={<AddNote />} />
            <Route exact path="/login" element={<Login setToken={setToken}/>} />
            <Route exact path="/signup" element={<Signup setToken={setToken}/>} />
          </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
      </AlertState>    
      </>
  );
}

export default App;
