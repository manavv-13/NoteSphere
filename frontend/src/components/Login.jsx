import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alerts/alertContext";

function Login(props) {
  const navigate = useNavigate();
  const context = useContext(alertContext);
  const {msg,setAlert} = context;
  const host = "http://localhost:3000";
  const [credentials,setCredentials] = useState({email:"",password:""});

  const onChange=(e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    loginUser(credentials.email, credentials.password);
  }

  //Login User
  const loginUser=async (email,password)=>{
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
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
      props.setToken(json.token)
      navigate("/");
      setAlert(json.msg);
    }else{
      setAlert(json.msg);
    }
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
        <h1 className="text-white my-3">Login to enter NoteSphere!</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
