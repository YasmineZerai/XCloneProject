import mongoose from "mongoose";
import { number } from "zod";

export interface User {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  password: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  followersCount: number;
  followingCount: number;
}

const userSchema = new mongoose.Schema<User>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    required: true,
    default: "https://unsplash.com/photos/grayscale-photo-of-man-XHVpWcr5grQ",
  },
  createdAt: Date,
  updatedAt: Date,
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
});

export const UserModel = mongoose.model("users", userSchema);
