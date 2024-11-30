import mongoose from "mongoose";
import { User } from "./user";

export interface Block {
  _id: mongoose.Types.ObjectId;
  blockedBy: User | string;
  blocked: User | string;
  createdAt: Date;
}

const BlocksSchema = new mongoose.Schema<Block>({
  blockedBy: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  blocked: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  createdAt: Date,
});

export const BlocksModel = mongoose.model("Blocks", BlocksSchema);
