import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css"; // Import the CSS file
import { fetchRegister } from "../contacts/ContactFunctions";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchRegister(formData);

      alert(response.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      // Handle error
    }
    setFormData({
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
          value={formData.username}
          onChange={changeHandler}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={changeHandler}
        />
        <br />
        <div className="password-container">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
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
