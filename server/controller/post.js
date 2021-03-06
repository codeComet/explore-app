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

export const fetchSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const postData = await postModel.findById(id);
    res.status(201).json(postData);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
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

// export const likePost = async (req, res) => {
//   const { postId } = req.body;
//   try {
//     const selectedPost = await postModel.findById(postId);

//     const userIndex = selectedPost.likes.findIndex(
//       (id) => id === String(req.userId)
//     );
//     if (userIndex === -1) {
//       selectedPost.likes.push(userId);
//     } else {
//       selectedPost.likes.splice(userIndex, 1);
//     }

//     const updatedPost = await selectedPost.finidByIdAndUpdate(
//       postId,
//       selectedPost,
//       { new: true }
//     );
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Post doesn't exist" });
    }
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updatedPost = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, img } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Post doesn't exist" });
    }
    const updatedPost = {
      title,
      description,
      tags,
      img,
      _id: id,
    };

    await postModel.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
