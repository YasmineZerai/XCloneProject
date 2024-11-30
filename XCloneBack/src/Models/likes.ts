import mongoose from "mongoose";
import { User } from "./user";
import { Post } from "./posts";

export interface Like {
  _id: mongoose.Types.ObjectId;
  likedBy: User | string;
  likedOn: Post | string;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new mongoose.Schema<Like>({
  likedBy: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  likedOn: { type: mongoose.Types.ObjectId, ref: "posts", required: true },
  createdAt: Date,
  updatedAt: Date,
});

export const likeModel = mongoose.model("likes", likeSchema);
