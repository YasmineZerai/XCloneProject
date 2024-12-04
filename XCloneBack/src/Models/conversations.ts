import mongoose from "mongoose";
import { User } from "./user";

export interface Conversation {
  _id: mongoose.Types.ObjectId;
  userOne: User | string;
  userTwo: User | string;
}

const ConversationSchema = new mongoose.Schema<Conversation>({
  userOne: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  userTwo: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ConversationModel = mongoose.model(
  "Conversations",
  ConversationSchema
);
