import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUserService,
  listUsersService,
  updateUserService,
} from "../Services/users";
import { getUserById } from "../Database/users";

export const createUserController = async (req: Request, res: Response) => {
  const createdUser = await createUserService(req.body);
  res.status(createdUser.status).json({
    success: createdUser.success,
    message: createdUser.message,
    payload: createdUser.payload,
  });
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    payload: { users },
  });
};
export const getUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const loggedUser = req.body.loggedUser.userId;
  const result = await getUserService(userId, loggedUser);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const result = await deleteUserService(userId);
  if (result.acknowledged === false) {
    res.status(500).json({
      sucess: false,
      message: "operation could not be acknowledged by the database",
    });
  } else {
    if (result.deletedCount === 0) {
      res.status(404).json({
        sucess: false,
        message: "no user with this id",
      });
    } else
      res
        .status(200)
        .json({ suceess: true, message: "user deleted succesfully" });
  }
};
export const updateUserController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const body = {
    fullName: req.body.fullName,
    password: req.body.password,
    email: req.body.email,
    profilePicture: req.body.profilePicture,
  };
  const updatedUser = await updateUserService(body, userId);
  if (updatedUser)
    res.status(200).json({
      sucess: true,
      message: "user updated sucessfully",
      payload: { updatedUser },
    });
  else {
    res.status(404).json({
      sucess: false,
      message: "user not found",
    });
  }
};
