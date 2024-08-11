import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "./Login.css"; // Import the CSS file
axios.defaults.withCredentials = true;
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      navigate("/contacts");

      console.log(res.data);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Set loading to false after response is received
    }
  };

  return (
    <>
      <div className="login-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <h1>Login:</h1>

            <form onSubmit={submitHandler} className="login-form">
              <input
                className="login-form-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <div className="password-container">
                <input
                  className="login-form-input"
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <button type="submit" className="submit-button">
                Submit
              </button>
              <br />
              <Link to="/register">Don't have an account? Register</Link>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
