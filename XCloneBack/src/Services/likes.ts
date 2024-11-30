import { likePost, unlikePost } from "../Database/likes";
import { getPostById } from "../Database/posts";

export async function likePostService(postId: string, userId: string) {
  const existingPost = await getPostById(postId);
  if (!existingPost)
    return {
      status: 404,
      success: false,
      message: "post not found",
    };
  const likedPost = await likePost(postId, userId);
  return {
    status: 200,
    success: true,
    message: "post liked succesfully",
    payload: likedPost,
  };
}
export async function unlikePostService(postId: string, userId: string) {
  const existingPost = await getPostById(postId);
  if (!existingPost)
    return {
      status: 404,
      success: false,
      message: "post not found",
    };
  const unlikedPost = await unlikePost(postId, userId);
  return {
    status: 200,
    success: true,
    message: "post liked succesfully",
    payload: unlikedPost,
  };
}
