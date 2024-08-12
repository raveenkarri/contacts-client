import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchLogin } from "../contacts/ContactFunctions";

import "./Login.css"; // Import the CSS file
import { stateContext } from "..";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useContext(stateContext);
  const [loading, setLoading] = useState(false); // Loading state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      const res = await fetchLogin(formData);

      navigate("/contacts");
      setToken(Cookies.get("token"));
      alert(res.message);
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
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <div className="password-container">
                <input
                  className="login-form-input"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
