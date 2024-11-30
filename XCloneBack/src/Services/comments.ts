import {
  createComment,
  deleteComment,
  getAllComments,
  // deleteComment,
  getCommentById,
  updateComment,
} from "../Database/comments";
import { getPostById } from "../Database/posts";
import { getUserById } from "../Database/users";

type createCommentArgs = {
  commentedBy: string;
  comment: string;
};
type updateCommentArgs = {
  comment: string;
  userId: string;
};
export async function createCommentService(
  args: createCommentArgs,
  id: string
) {
  const user = await getUserById(args.commentedBy);
  const post = await getPostById(id);
  if (user && post) {
    const newComment = { ...args, commentedOn: id };
    return await createComment(newComment);
  }
  return null;
}
export async function deleteCommentService(
  postId: string,
  commentId: string,
  userId: string
) {
  const post = await getPostById(postId);
  if (!post) return { status: 404, message: "post not found", success: false };
  const comment = await getCommentById(commentId);

  if (!comment)
    return { status: 404, message: "comment not found", success: false };
  const postOwner = post.postedBy;
  const commenter = comment.commentedBy;
  if (postOwner !== userId && commenter !== userId)
    return {
      status: 400,
      message: "not authorized to delete this comment",
      success: false,
    };
  await deleteComment(postId, commentId);
  return {
    status: 200,
    message: "comment deleted succesfully",
    success: true,
  };
}
export async function updateCommentService(
  postId: string,
  commentId: string,
  args: updateCommentArgs
) {
  const post = await getPostById(postId);
  if (!post)
    return {
      status: 404,
      message: "no post found with this id",
      success: false,
    };
  const comment = await getCommentById(commentId);
  if (!comment)
    return {
      status: 404,
      message: "no post found with this id",
      success: false,
    };
  const commenter = comment.commentedBy;
  if (args.userId !== commenter)
    return {
      status: 404,
      message: "not authorized to modify comment",
      success: false,
    };
  const updatedComment = await updateComment(commentId, args.comment);
  return {
    status: 200,
    message: "comment updated successfully",
    success: true,
    payload: { updatedComment },
  };
}
export async function getAllCommentsService(postId: string) {
  return await getAllComments(postId);
}
