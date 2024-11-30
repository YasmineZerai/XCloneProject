import { CommentModel } from "../Models/comment";
import { PostModel } from "../Models/posts";
import { UserModel } from "../Models/user";

type createCommentArgs = {
  commentedOn: string;
  commentedBy: string;
  comment: string;
};
export async function createComment(args: createCommentArgs) {
  const post = await PostModel.findByIdAndUpdate(args.commentedOn, {
    $inc: { commentsCount: 1 },
  });

  return await CommentModel.create({
    ...args,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
export async function getCommentById(commentId: string) {
  return CommentModel.findById(commentId);
}

export async function deleteComment(postId: string, commentId: string) {
  const post = await PostModel.findByIdAndUpdate(postId, {
    $inc: { commentsCount: -1 },
  });
  await CommentModel.deleteOne({ _id: commentId });
}
export async function updateComment(commentId: string, comment: string) {
  return await CommentModel.findByIdAndUpdate(
    commentId,
    { comment: comment },
    {
      returnDocument: "after",
    }
  );
}
export async function getAllComments(postId: string) {
  return await CommentModel.find({ commentedOn: postId });
}
