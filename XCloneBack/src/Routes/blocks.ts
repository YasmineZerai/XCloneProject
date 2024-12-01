import { Application, request } from "express";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/auth";
import { checkIfBlock, extractTargetUserFromParams } from "../Middleware/block";
import { blockUserController } from "../Controllers/blocks";
import { errorMiddleware } from "../Middleware/error";

export function configureBlocks(app: Application) {
  app.post("/users/:userId/blocks", [
    validation(
      z.object({
        params: z.object({
          userId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid user id",
            }),
        }),
      })
    ),
    authMiddleware,

    blockUserController,
  ]);
  app.delete("/users/:userId/blocks", [
    validation(
      z.object({
        params: z.object({
          userId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid user id",
            }),
        }),
      })
    ),
    authMiddleware,
  ]);
}
