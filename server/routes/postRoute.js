import express from "express";
import { createPost, fetchPosts } from "../controller/post.js";

const router = express.Router();

router.get("/", fetchPosts);
router.post("/", createPost);

export default router;
