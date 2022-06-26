import express from "express";
import auth from "../middlewares/auth.js";
import { createPost, fetchPosts } from "../controller/post.js";

const router = express.Router();

router.get("/", fetchPosts);
router.post("/addPost", auth, createPost);

export default router;
