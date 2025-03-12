import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alerts/alertContext";

function Signup(props) {
  const navigate = useNavigate();
  const host = "http://localhost:3000";
  const [credentials,setCredentials] = useState({name:"",email:"",password:""});
  const context = useContext(alertContext);
  const {msg,setAlert} = context;

  const onChange=(e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    signUpUser(credentials.name, credentials.email, credentials.password);
  }

  //Login User
  const signUpUser=async (name,email,password)=>{
    const response = await fetch(`${host}/api/auth/signIn`, {
      method: "POST",
      body: JSON.stringify({
        "name":name,
        "email":email,
        "password":password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.token);
      props.setToken(json.token); // Update state
      navigate("/");
      setAlert(json.msg);
    }
    setAlert(json.msg);
  }
  return (
    <>
            <div className="container my-3">
    {msg && 
          <div className="alert alert-info" role="alert">
            {msg}
          </div>
        }
    </div>
      <div className="container">
        <h1 className="text-white my-3">Create a New Account!</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text text-white">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label text-white"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign-Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
