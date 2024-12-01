import { Request, Response } from "express";
import { blockUserService, unblockUserService } from "../Services/blocks";
import { transformer } from "zod";

export const blockUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const loggedUserId = req.body.loggedUser.userId;
  const result = await blockUserService(loggedUserId, userId);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const unblockUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const loggedUserId = req.body.loggedUser.userId;
  const result = await unblockUserService(loggedUserId, userId);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
