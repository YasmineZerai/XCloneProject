import mongoose from "mongoose";
import { User } from "./user";
import { Post } from "./posts";

export interface Follow {
  _id: mongoose.Types.ObjectId;
  follower: User | string;
  following: User | string;
  createdAt: Date;
}

const followsSchema = new mongoose.Schema<Follow>({
  follower: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  following: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  createdAt: Date,
});

export const followsModel = mongoose.model("follows", followsSchema);
