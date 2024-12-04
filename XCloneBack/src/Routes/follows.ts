import { Application } from "express";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/auth";
import { errorMiddleware } from "../Middleware/error";
import {
  followUserController,
  listFollowersController,
  unfollowUserController,
} from "../Controllers/follows";
export function configureFollows(app: Application) {
  app.post("/users/:userId/follows", [
    validation(
      z.object({
        params: z.object({
          userId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid userId",
            }),
        }),
      })
    ),
    authMiddleware,
    followUserController,
  ]);
  app.delete("/users/:userId/follows", [
    validation(
      z.object({
        params: z.object({
          userId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid userId",
            }),
        }),
      })
    ),
    authMiddleware,
    unfollowUserController,
  ]);
  app.get("/followers", [authMiddleware, listFollowersController]);
}
