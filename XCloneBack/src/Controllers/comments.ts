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
  const comment = await createCommentService(body, postId);
  if (comment) {
    res.status(200).json({
      sucess: true,
      message: "comment created successfully",
      payload: { comment },
    });
  } else
    res.status(400).json({
      sucess: false,
      message: "post or user not found",
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
};
export const getAllCommentsController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const comments = await getAllCommentsService(postId);
  res.status(202).json({
    success: true,
    message: "comments fetched succesfully",
    payload: { comments },
  });
};
