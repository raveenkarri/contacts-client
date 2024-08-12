import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import UserContacts from "./contacts/UserContacts";
import ErrorPage from "./ErrorPage";
import { stateContext } from ".";
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(stateContext);
  return token ? children : <ErrorPage />;
};
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <UserContacts />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
