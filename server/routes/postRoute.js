import express from "express";
import auth from "../middlewares/auth.js";
import { createPost, fetchPosts, likePost } from "../controller/post.js";

const router = express.Router();

router.get("/", fetchPosts);
router.post("/addPost", auth, createPost);
router.post("/likePost", likePost);

export default router;
