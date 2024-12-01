import { Application } from "express";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/auth";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  updateCommentController,
} from "../Controllers/comments";
import { errorMiddleware } from "../Middleware/error";
import { checkIfBlock, extractTargetUserFromPost } from "../Middleware/block";
import { error } from "console";

export function configureComments(app: Application) {
  app.post("/posts/:postId/comments", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid Id",
            }),
        }),
        body: z
          .object({
            comment: z.string(),
          })
          .strict(),
      })
    ),
    authMiddleware,
    checkIfBlock(extractTargetUserFromPost),
    createCommentController,
    errorMiddleware,
  ]); // jawha behi (reste le probleme d'un utilisateur bloqué)
  app.delete("/posts/:postId/comments/:commentId", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid Id",
            }),
          commentId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid Id",
            }),
        }),
      })
    ),
    authMiddleware,
    checkIfBlock(extractTargetUserFromPost),
    deleteCommentController,
    errorMiddleware,
  ]); // jawha behi
  app.put("posts/:postId/comments/:commentId", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid postId",
            }),
          commentId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid commentId",
            }),
        }),
        body: z
          .object({
            comment: z.string(),
          })
          .strict(),
      })
    ),
    authMiddleware,
    checkIfBlock(extractTargetUserFromPost),
    updateCommentController,
    errorMiddleware,
  ]); //jawha behi
  app.get("/posts/:postId/comments", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid postId",
            }),
        }),
      })
    ),
    authMiddleware,
    checkIfBlock(extractTargetUserFromPost),
    getAllCommentsController,
    errorMiddleware,
  ]);
}