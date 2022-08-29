import mongoose from "mongoose";
import postModel from "../models/post.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postModel({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const editPost = async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  // console.log(post, req.params);
  try {
    const postToEdit = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(postToEdit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const fetchPosts = async (req, res) => {
  const { page } = req.query;
  try {
    // const posts = await postModel.find();
    const postLimit = 6;
    const startIndex = (Number(page) - 1) * postLimit;
    const totalPost = await postModel.countDocuments({});
    const totalPage = Math.ceil(totalPost / postLimit);
    const posts = await postModel
      .find()
      .limit(postLimit)
      .skip(startIndex)
      .sort({ id: -1 });

    res.status(201).json({
      data: posts,
      totalPage,
      currentPage: Number(page),
      totalPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const fetchSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const postData = await postModel.findById(id);
    res.status(201).json(postData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const dashboard = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const getUserPosts = await postModel.find({ creator: id });
    res.status(200).json(getUserPosts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//like post controller.

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    res.status(401).json({ message: "User is not logged in" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Post doesn't exist" });
  }

  try {
    const selectedPost = await postModel.findById(id);

    const userIndex = selectedPost.likes.findIndex(
      (id) => id === String(req.userId)
    );
    if (userIndex === -1) {
      selectedPost.likes.push(req.userId);
    } else {
      selectedPost.likes.splice(userIndex, 1);
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, selectedPost, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Post doesn't exist" });
    }
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const searchPosts = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await postModel.find({ title: title });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const tagPosts = async (req, res) => {
  const { tag } = req.params;
  try {
    const posts = await postModel.find({ tags: { $in: tag } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const relatedPosts = async (req, res) => {
  const tags = req.body;
  try {
    const posts = await postModel.find({ tags: { $in: tags } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
