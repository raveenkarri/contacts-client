import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import UserContacts from "./contacts/UserContacts";
import ErrorPage from "./ErrorPage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<UserContacts />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
