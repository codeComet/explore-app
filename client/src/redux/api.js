import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const login = (formData) => API.post("/users/signin", formData);
