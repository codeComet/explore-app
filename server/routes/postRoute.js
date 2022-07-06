import express from "express";
import auth from "../middlewares/auth.js";
import {
  createPost,
  fetchPosts,
  fetchSinglePost,
  dashboard,
} from "../controller/post.js";

const router = express.Router();

router.get("/", fetchPosts);
router.get("/:id", fetchSinglePost);
router.post("/addPost", auth, createPost);
router.get("/dashboard/:id", dashboard);
// router.post("/likePost", likePost);

export default router;
