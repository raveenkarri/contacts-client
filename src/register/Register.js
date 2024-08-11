import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", data);

      alert("Registered Successfully!!");
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error
    }
    setData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form
        onSubmit={submitHandler}
        autoComplete="off"
        className="register-form"
      >
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={data.username}
          onChange={changeHandler}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={data.email}
          onChange={changeHandler}
        />
        <br />
        <div className="password-container">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={changeHandler}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
        <br />
        <div className="routes-container">
          <h1>
            <Link
              style={{ color: "white" }}
              to="/contacts"
              className="route-link"
            >
              User contacts
            </Link>
            <br />
            <Link style={{ color: "white" }} to="/" className="route-link">
              Login
            </Link>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Register;
