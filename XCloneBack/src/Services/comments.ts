import { findBlock } from "../Database/blocks";
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
  postId: string
) {
  if (args.comment === "")
    return { status: 400, success: false, message: "Comment cannot be blank." };
  const existingPost = await getPostById(postId);
  if (!existingPost)
    return { status: 404, success: false, message: "post not found" };
  const targetUserId = existingPost.postedBy as string;
  const existingBlock = await findBlock(targetUserId, args.commentedBy);
  if (existingBlock)
    return { status: 403, success: false, message: "user blocked" };
  const comment = await createComment({
    comment: args.comment,
    commentedBy: args.commentedBy,
    commentedOn: postId,
  });
  return {
    status: 201,
    success: true,
    message: "comment created successfully",
    payload: { comment },
  };
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
  const postOwner = post.postedBy as string;
  const commenter = comment.commentedBy as string;
  const existingBlock = await findBlock(postOwner, commenter);
  if (existingBlock)
    return {
      status: 403,
      message: "user blocked, cannot do this operation",
      success: false,
    };
  if (postOwner !== userId && commenter !== userId)
    return {
      status: 403,
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
      status: 403,
      message: "not authorized to modify comment, not your comment",
      success: false,
    };
  const postOwner = post.postedBy as string;
  const existingBlock = await findBlock(commenter, postOwner);
  if (existingBlock)
    return {
      status: 403,
      message: "cannot do operation, user blocked",
      success: false,
    };
  const updatedComment = await updateComment(commentId, args.comment);
  return {
    status: 201,
    message: "comment updated successfully",
    success: true,
    payload: { updatedComment },
  };
}
export async function getAllCommentsService(postId: string, userId: string) {
  const existingPost = await getPostById(postId);
  if (!existingPost)
    return { success: false, message: "post not found", status: 404 };
  const postOwner = existingPost.postedBy as string;
  const existingBlock = await findBlock(postOwner, userId);
  if (existingBlock)
    return {
      success: false,
      message: "cannot do operation, user blocked",
      status: 403,
    };
  const comments = await getAllComments(postId);
  // this filtering is to make sure that you cannot see blocked users' comments
  const filteredComments = (
    await Promise.all(
      comments.map(async (value) => {
        const commenter = value.commentedBy as string;
        const existingBlock = await findBlock(commenter, userId);
        return !existingBlock;
      })
    )
  ).filter(Boolean);

  return {
    success: true,
    message: "comments fetched successfully",
    status: 200,
    payload: { filteredComments },
  };
}
