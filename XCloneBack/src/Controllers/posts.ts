// import { Request, Response } from "express";
// import { createPostService, getPostService, listPostsService, updatePostService} from "../Services/posts";
// import { Post } from "../Models/posts";

import { Request, Response } from "express";
import {
  createPostService,
  listPostsService,
  getPostService,
  deletePostService,
  updatePostService,
} from "../Services/posts";

export const createPostController = async (req: Request, res: Response) => {
  const newPost = {
    parentPost: req.body.parentPost,
    images: req.body.images,
    description: req.body.description,
    postedBy: req.body.loggedUser.userId,
  };
  const result = await createPostService(newPost);

  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService();
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    payload: { posts },
  });
};

export const getPostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const post = await getPostService(postId);
  if (post == null) {
    res.status(404).json({
      sucess: false,
      message: "no posts with this id babes",
    });
  } else {
    res.status(201).json({
      succes: true,
      message: "post fetched successfully",
      payload: { post },
    });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.body.loggedUser.userId;
  const result = await deletePostService(postId, userId);
  res.status(result.status).json({
    succes: result.succes,
    message: result.message,
  });
};

export const updatePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.body.loggedUser.userId;
  const body = { images: req.body.images, description: req.body.description };
  const result = await updatePostService(body, postId, userId);
  res.status(result.status).json({
    success: result.succes,
    mesage: result.message,
    payload: result.payload,
  });
};
