import axios from "axios";

const API = axios.create({
  baseURL: "https://crud-1-cdxk.onrender.com",
});

export const createUser = (data) => API.post("/user", data);
export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const getAllUsers = () => API.get("/users"); 
