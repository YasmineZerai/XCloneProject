import { Application, Request, Response } from "express";
import {
  createPostController,
  listPostsController,
  getPostController,
  deletePostController,
  updatePostController,
} from "../Controllers/posts";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import { errorMiddleware } from "../Middleware/error";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/auth";

export default function configurePosts(app: Application) {
  app.post("/posts", [
    validation(
      z.object({
        body: z.object({
          parentPost: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid Id for parent object",
            })
            .optional(),
          images: z.array(z.string().url()),
          description: z.string(),
        }),
      })
    ),
    authMiddleware,
    createPostController,
  ]); //jawha behi
  app.get("/posts", [authMiddleware, listPostsController]); //a traiter quels posts fel query
  app.get("/posts/:postId", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "Invalid Id",
            }),
        }),
      })
    ),
    authMiddleware,
    getPostController,
  ]); // a traiter le cas ou le poste est d'une personne bloquée
  app.delete("/posts/:postId", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "Invalid Id",
            }),
        }),
      })
    ),
    authMiddleware,
    deletePostController,
  ]); // jawha behi
  app.put("/posts/:postId", [
    validation(
      z.object({
        params: z.object({
          postId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "Invalid Id",
            }),
        }),
        body: z
          .object({
            images: z.array(z.string().url()),
            description: z.string(),
          })
          .partial()
          .strict(),
      })
    ),
    authMiddleware,
    updatePostController,
  ]); //jawha behi
}
