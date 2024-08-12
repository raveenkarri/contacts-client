import axios from "axios";

const axiosRequest = async (method, url, token, data) => {
  try {
    const headConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios({ method, url, data, ...headConfig });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const axiosUserRequest = async (method, url, data) => {
  try {
    const res = await axios({ method, url, data });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchRegister = async (formData) => {
  return await axiosUserRequest("post", "/register", formData);
};
export const fetchLogin = async (formData) => {
  return await axiosUserRequest("post", "/login", formData);
};

export const fetchContacts = async (token) => {
  return await axiosRequest("get", "/userContacts", token);
};
export const createContacts = async (token, contact) => {
  return await axiosRequest("post", "/create", token, contact);
};
export const modifyContacts = async (contactId, token, contact) => {
  return await axiosRequest("put", `/update/${contactId}`, token, contact);
};
export const removeContacts = async (contactId, token) => {
  return await axiosRequest("delete", `/delete/${contactId}`, token);
};

export const fetchLogout = async (token) => {
  return await axiosRequest("post", "/logout", token);
};
