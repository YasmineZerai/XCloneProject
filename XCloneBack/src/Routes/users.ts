import { Application } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController,
} from "../Controllers/users";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import { errorMiddleware } from "../Middleware/error";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/auth";

export default function configureUsers(app: Application) {
  app.post("/users", [
    validation(
      z.object({
        body: z.object({
          fullName: z.string(),
          password: z.string(),
          email: z.string().email(),
          profilePicture: z.string().url().optional(),
        }),
      })
    ),
    createUserController,
  ]); // testhakkesh auth
  app.get("/users", listUsersController); // reste a voir fazet l query
  app.get("/users/:userId", [
    validation(
      z.object({
        params: z.object({
          userId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "Invalid Id",
            }),
        }),
      })
    ),
    authMiddleware,
    getUserController,
  ]); // verifier bloquage
  app.delete("/users", [authMiddleware, deleteUserController, errorMiddleware]); // jawha behi
  app.put("/users", [
    validation(
      z.object({
        body: z
          .object({
            fullName: z.string(),
            email: z.string().email(),
            password: z.string(),
            profilePicture: z.string().url(),
          })
          .partial()
          .strict(),
      })
    ),
    authMiddleware,
    updateUserController,
  ]); //jawha behi
}
