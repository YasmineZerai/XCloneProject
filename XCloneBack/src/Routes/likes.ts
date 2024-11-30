import { Application } from "express";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/auth";
import { likePostController, unlikePostController } from "../Controllers/likes";
import { errorMiddleware } from "../Middleware/error";

export function configureLikes(app: Application) {
  app.post("/posts/:postId/likes", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid Id",
            }),
        }),
      })
    ),
    authMiddleware,
    likePostController,
  ]); // jawha behi (reste le probleme d'un utilisateur bloqué)
  app.delete("/posts/:postId/likes", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid Id",
            }),
        }),
      })
    ),
    authMiddleware,
    unlikePostController,
  ]); // jawha behi (reste le probleme d'un utilisateur bloqué)
}
