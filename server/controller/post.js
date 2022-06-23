import postModel from "../models/post.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postModel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const fetchPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
