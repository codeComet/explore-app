import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import PostReducer from "./features/postSlice";
import jwtDecode from "jwt-decode";

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user"))["token"];
  if (jwtDecode(token).exp < Date.now() / 1000) {
    next(action);
    localStorage.clear();
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
  },
  applyMiddleware: [checkTokenExpirationMiddleware],
});

export default store;
