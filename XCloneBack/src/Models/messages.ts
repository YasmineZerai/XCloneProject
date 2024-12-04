import mongoose from "mongoose";
import { User } from "./user";

export interface Message {
  _id: mongoose.Types.ObjectId;
  sender: User | string;
  reciever: User | string;
  sentAt: Date;
}

const MessageSchema = new mongoose.Schema<Message>({
  sender: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  reciever: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  sentAt: Date,
});

export const MessageModel = mongoose.model("messages", MessageSchema);
