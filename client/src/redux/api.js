import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
export const googleLogin = (result) => API.post("/user/googleLogin", result);

// POST ACTIONS

export const fetchPosts = () => API.get("/posts");
export const createPost = (formData) => API.post("/posts/addPost", formData);
export const likePost = (postId) => API.post("/posts/likePost", postId);
