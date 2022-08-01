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
export const fetchSinglePost = (id) => API.get(`/posts/${id}`);
export const createPost = (formData) => API.post("/posts/addPost", formData);
export const likePost = (postId) => API.post("/posts/likePost", postId);
export const getDashboard = (userId) => API.get(`/posts/dashboard/${userId}`); //user id
export const deletePost = (postId) => API.delete(`/posts/deletePost/${postId}`);
