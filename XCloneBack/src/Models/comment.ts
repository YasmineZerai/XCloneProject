import mongoose from "mongoose";
import { User } from "./user";
import { Post } from "./posts";

export interface Comment {
  _id: mongoose.Types.ObjectId;
  commentedBy: User | string;
  commentedOn: Post | string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<Comment>({
  commentedBy: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  commentedOn: { type: mongoose.Types.ObjectId, ref: "posts", required: true },
  comment: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date,
});

export const CommentModel = mongoose.model("comments", commentSchema);
