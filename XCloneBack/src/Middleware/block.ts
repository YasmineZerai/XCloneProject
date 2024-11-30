import { NextFunction, Request, Response } from "express";
import { findBlock } from "../Database/blocks";
import { getPostById } from "../Database/posts";
type ExtractTargetUserFunction = (req: Request) => Promise<string | null>;
export const extractTargetUserFromParams: ExtractTargetUserFunction = async (
  req: Request
) => {
  const { userId } = req.params;
  return userId;
};
export const extractTargetUserFromPost: ExtractTargetUserFunction = async (
  req: Request
) => {
  const { postId } = req.params;
  const existingPost = await getPostById(postId);
  if (!existingPost) return null;
  return existingPost.postedBy as string;
};
export const checkIfBlock = (extractFunction: ExtractTargetUserFunction) => {
  const blockMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const targetUser = await extractFunction(req);
    if (!targetUser)
      next({ success: false, status: 404, message: "target user not found" });
    else {
      const existingBlock = await findBlock(
        targetUser,
        req.body.loggedUser.userId
      );
      if (existingBlock)
        next({
          success: false,
          status: 404,
          message: "target user is blocked ",
        });
      else next();
    }
  };
  return blockMiddleware;
};
