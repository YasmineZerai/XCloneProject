import { Request, Response } from "express";
import { loginService } from "../Services/auth";
export const loginController = async (req: Request, res: Response) => {
  const loginToken = await loginService(req.body);

  res.status(loginToken.status).json({
    success: loginToken.success,
    message: loginToken.message,
    payload: loginToken.payload,
  });
};
export const logoutController = async (req: Request, res: Response) => {};
