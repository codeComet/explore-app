import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  tags: [String],
  name: { type: String },
  img: {
    type: String,
  },
  creator: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", postSchema);
