import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const createPost = createAsyncThunk(
  "/posts/addPost",
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

export const editPost = createAsyncThunk(
  "/posts/editPost/:id",
  async ({ id, updatedPostData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.editPost(id, updatedPostData);
      toast.success("Post updated successfully!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "/posts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.fetchPosts(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "/posts/:id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.fetchSinglePost(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "/posts/likePost",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.likePost(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleUserPosts = createAsyncThunk(
  "/posts/dashboard/:id",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getDashboard(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "/posts/deletePost",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(id);
      toast.success("Post deleted successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchPost = createAsyncThunk(
  "/posts/search",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.searchPost(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTagPosts = createAsyncThunk(
  "/posts/tags/:tag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.tagPosts(tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedPosts = createAsyncThunk(
  "/posts/relatedPosts",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.relatedPosts(tags);
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
    tagPosts: [],
    relatedPosts: [],
    postsFromUser: [],
    currentPage: 1,
    totalPage: null,
    loading: false,
    error: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [editPost.pending]: (state) => {
      state.loading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [action.payload];
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
      state.totalPage = action.payload.totalPage;
      state.currentPage = action.payload.currentPage;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSinglePost.pending]: (state) => {
      state.loading = true;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.singlePost = action.payload;
    },
    [getSinglePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSingleUserPosts.pending]: (state) => {
      state.loading = true;
    },
    [getSingleUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.postsFromUser = action.payload;
    },
    [getSingleUserPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.postsFromUser = state.postsFromUser.filter(
          (post) => post._id !== id
        );
        state.posts = state.posts.filter((post) => post._id !== id);
      }
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likePost.pending]: (state) => {},
    [likePost.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.posts = state.posts.map((post) =>
          post._id === id ? action.payload : post
        );
      }
    },
    [likePost.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [searchPost.pending]: (state) => {
      state.loading = true;
    },
    [searchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [searchPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTagPosts.pending]: (state) => {
      state.loading = true;
    },
    [getTagPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagPosts = action.payload;
    },
    [getTagPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedPosts.pending]: (state) => {
      state.loading = true;
    },
    [getRelatedPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedPosts = action.payload;
    },
    [getRelatedPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = postSlice.actions;

export default postSlice.reducer;
