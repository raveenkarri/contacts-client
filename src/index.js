import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";

// Set default configurations for axios
axios.defaults.baseURL = "https://contacts-api-dhfb.onrender.com/api/users";

// Create a context for state management
export const stateContext = createContext();

// StateProvider component
export const StateProvider = ({ children }) => {
  const [token, setToken] = useState(() => Cookies.get("token") || "");

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  return (
    <stateContext.Provider value={{ token, setToken }}>
      {children}
    </stateContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
