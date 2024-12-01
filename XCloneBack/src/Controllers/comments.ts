import { Request, Response } from "express";
import {
  createCommentService,
  deleteCommentService,
  getAllCommentsService,
  updateCommentService,
} from "../Services/comments";

export const createCommentController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.body.loggedUser.userId;
  const body = { comment: req.body.comment, commentedBy: userId };
  const result = await createCommentService(body, postId);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const deleteCommentController = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const userId = req.body.loggedUser.userId;
  const result = await deleteCommentService(postId, commentId, userId);
  res.status(result.status).json({
    sucess: result.success,
    message: result.message,
  });
};
export const updateCommentController = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const body = {
    comment: req.body.comment,
    userId: req.body.loggedUser.userId,
  };
  const result = await updateCommentService(postId, commentId, req.body);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const getAllCommentsController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.body.loggedUser.userId;
  const result = await getAllCommentsService(postId, userId);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
