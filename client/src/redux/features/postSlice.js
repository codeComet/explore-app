import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const createPost = createAsyncThunk(
  "/posts/createPost",
  async ({ updatedPostData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createPost(updatedPostData);
      toast.success("Post created successfully!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    singlePost: {},
    posts: [],
    postsFromUser: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default postSlice.reducer;
