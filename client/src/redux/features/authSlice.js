import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.login(formData);
      toast.success("Login Successful!");
      navigate("/");
      return response.data;
    } catch (error) {
      //console.log(error);
      // toast.error("Login failed!");
      return rejectWithValue(error.response.data);
      // console.log(rejectWithValue(error.response.data.message));
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signup(formData);
      toast.success("Signup Successful!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleLogin(result);
      toast.success("Google Login Successful!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: "",
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleLogin.pending]: (state) => {
      state.loading = true;
    },
    [googleLogin.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
