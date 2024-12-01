import { findBlock } from "../Database/blocks";
import {
  createPost,
  deletePost,
  getPostById,
  listPosts,
  updatePosts,
} from "../Database/posts";
import { Post } from "../Models/posts";

type CreatePostArgs = {
  postedBy: string;
  images: string[];
  description: string;
  parentPost: string;
};
type UpdatePostArgs = {
  images?: string[];
  description?: string;
};
export async function createPostService(args: CreatePostArgs) {
  if (args.parentPost) {
    const parentPost = await getPostById(args.parentPost);
    if (!parentPost)
      return {
        success: false,
        message: "no parent post with this id",
        status: 404,
      };
  }
  const createdPost = await createPost({
    parentPost: args.parentPost,
    description: args.description,
    images: args.images,
    postedBy: args.postedBy,
  });
  return {
    success: true,
    message: "post created successfully",
    status: 200,
    payload: { createdPost },
  };
}
//TODO: fix this service with queries
export async function listPostsService() {
  return await listPosts();
}

export async function getPostService(postId: string, userId: string) {
  const post = await getPostById(postId);
  if (!post) return { status: 404, message: "post not found", success: false };
  const postOwner = post.postedBy as string;
  const existingBlock = await findBlock(postOwner, userId);
  if (existingBlock)
    if (!post)
      return {
        status: 403,
        message: "cannot get post, blocked user",
        success: false,
      };
  return {
    status: 201,
    message: "post fetched successfully",
    success: true,
    payload: { post },
  };
}
export async function deletePostService(postId: string, userId: string) {
  const existingPost = await getPostById(postId);
  if (!existingPost)
    return { status: 404, succes: false, message: "post not found" };
  if (existingPost.postedBy !== userId)
    return {
      status: 400,
      succes: false,
      message: "not authorized to delete this post ",
    };
  await deletePost(postId);
  return { status: 200, succes: true, message: "post deleted successfully " };
}

export async function updatePostService(
  args: UpdatePostArgs,
  postId: string,
  userId: string
) {
  const existingPost = await getPostById(postId);
  if (!existingPost)
    return { status: 404, message: "post not found", success: false };
  if (existingPost.postedBy !== userId)
    return {
      status: 400,
      message: "user not authorized to update",
      succes: false,
    };
  const updatedPost = await updatePosts(args, postId);
  return {
    status: 200,
    message: "post updated succesfully",
    success: true,
    payload: updatedPost,
  };
}
