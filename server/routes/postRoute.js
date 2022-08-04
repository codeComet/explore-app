import express from "express";
import auth from "../middlewares/auth.js";
import {
  createPost,
  fetchPosts,
  fetchSinglePost,
  dashboard,
  deletePost,
  updatedPost,
  editPost,
} from "../controller/post.js";

const router = express.Router();

router.get("/", fetchPosts);
router.get("/:id", fetchSinglePost);
router.post("/addPost", auth, createPost);
router.post("/editPost/:id", auth, editPost);
router.get("/dashboard/:id", dashboard);
router.patch("/addPost/:id", auth, updatedPost);
router.delete("/deletePost/:id", auth, deletePost);
// router.post("/likePost", likePost);

export default router;
