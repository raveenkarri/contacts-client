import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserContacts.css";
import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;

const UserContacts = () => {
  const [contact, setContact] = useState({
    name: "",
    contactEmail: "",
    phone: "",
  });

  const [userData, setUserData] = useState([]);

  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);
  const token = Cookies.get("token");
  console.log(token);
  const contactHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Get contacts of logged-in user
  const getContacts = async () => {
    try {
      const res = await axios.get("/userContacts", {
        withCredentials: true,
      });
      console.log(res.data.contacts);
      setUserData(res.data.contacts);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  // Handle form submission
  const contactSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editContactId) {
        await updateContact(editContactId);
      } else {
        await addContact();
      }
      getContacts();
      resetForm();
    } catch (error) {
      alert(`Contact not ${editContactId ? "updated" : "submitted"}`);
    }
  };

  // Add new contact
  const addContact = async () => {
    try {
      await axios.post("/create", { contacts: [contact] });
      alert("Contact submitted successfully!!");
      getContacts();
      resetForm();
    } catch (Error) {
      console.log(Error);
      setEditContactId(null);
      alert("Contact not submitted");
    }
  };

  // Update existing contact
  const updateContact = async (contactId) => {
    try {
      await axios.put(`/update/${contactId}`, { contacts: [contact] });
      alert("Contact updated successfully!!");
      getContacts();
      resetForm();
    } catch (Error) {
      console.log(Error);
      setEditContactId(null);
      alert("Contact not updated");
    }
  };

  // Delete contact
  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`/delete/${contactId}`);
      alert("Contact deleted successfully!!");
      getContacts();
    } catch (Error) {
      console.log(Error);
      alert("Contact not deleted");
    }
  };

  // Handle edit button click
  const handleEditClick = (contact) => {
    setContact({
      name: contact.name,
      contactEmail: contact.contactEmail,
      phone: contact.phone,
    });
    setEditContactId(contact._id);
  };

  const resetForm = () => {
    setContact({ name: "", contactEmail: "", phone: "" });
    setEditContactId(null);
  };
  const logoutHandler = () => {};

  return (
    <div>
      <hr />
      <div className="heading-contactForm">
        <div className="heading">
          <h1>
            Hi
            <br />
            <br />
            Add Your contacts,
          </h1>
        </div>

        <div className="contact-form">
          <form onSubmit={contactSubmit}>
            <input
              type="text"
              name="name"
              value={contact.name}
              placeholder="Contact name"
              onChange={contactHandler}
            />
            <br />
            <input
              type="text"
              name="contactEmail"
              value={contact.contactEmail}
              placeholder="Contact email"
              onChange={contactHandler}
            />
            <br />
            <input
              type="text"
              name="phone"
              value={contact.phone}
              placeholder="Contact Number"
              onChange={contactHandler}
            />
            <br />
            <button className="submit-container" type="submit">
              {editContactId ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <hr />
      <h1>Your Contacts:</h1>
      <table id="customers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Edit or Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.contactEmail}</td>
                <td>{contact.phone}</td>
                <td>
                  <div className="button-container">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={() => handleEditClick(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => handleDeleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                No contacts found!!!-----
                <span style={{ color: "blue" }}>
                  Please add contacts in the above Form^
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h1>
          <Link to="/" className="logout-container" onClick={logoutHandler}>
            Logout
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default UserContacts;
