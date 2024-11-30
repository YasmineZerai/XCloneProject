import { Request, Response } from "express";
import { likePostService, unlikePostService } from "../Services/likes";

export const likePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.body.loggedUser.userId;
  const result = await likePostService(postId, userId);
  res.status(result.status).json({
    success: result.status,
    message: result.message,
    payload: result.payload,
  });
};
export const unlikePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.body.loggedUser.userId;
  const result = await unlikePostService(postId, userId);
  res.status(result.status).json({
    success: result.status,
    message: result.message,
    payload: result.payload,
  });
};
