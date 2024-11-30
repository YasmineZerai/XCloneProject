import mongoose from "mongoose";
import { User } from "./user";
const postSchema = new mongoose.Schema({
  parentPost: { type: mongoose.Types.ObjectId, ref: "posts", required: false },
  postedBy: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  images: [{ type: String }],
  description: { type: String, required: false },
  likesCount: { type: Number, default: 0 },
  retweetsCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: Date,
  updatedAt: Date,
});
export const PostModel = mongoose.model("posts", postSchema);
export interface Post {
  _id: mongoose.Types.ObjectId;
  parentPost: Post | string;
  postedBy: User | string;
  images: string[];
  description?: string;
  likesCount: number;
  retweetsCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
