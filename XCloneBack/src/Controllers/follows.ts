import { Request, Response } from "express";
import {
  followUserService,
  listFollowersService,
  unfollowUserService,
} from "../Services/follows";

export const followUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const follower = req.body.loggedUser.userId;
  const result = await followUserService(userId, follower);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const unfollowUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const follower = req.body.loggedUser.userId;
  const result = await unfollowUserService(userId, follower);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const listFollowersController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const payload = await listFollowersService(userId);
  res.status(201).json({
    success: true,
    message: "followers fetched successfully",
    payload: { payload },
  });
};
