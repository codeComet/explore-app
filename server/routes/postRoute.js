import express from "express";
import auth from "../middlewares/auth.js";
import {
  createPost,
  fetchPosts,
  fetchSinglePost,
  dashboard,
  deletePost,
  editPost,
  searchPosts,
  tagPosts,
} from "../controller/post.js";

const router = express.Router();

router.get("/", fetchPosts);
router.get("/:id", fetchSinglePost);
router.post("/search", searchPosts);
router.get("/tags/:tag", tagPosts);

router.post("/addPost", auth, createPost);
router.patch("/editPost/:id", auth, editPost);
router.get("/dashboard/:id", auth, dashboard);
router.delete("/deletePost/:id", auth, deletePost);
// router.post("/likePost", likePost);

export default router;
