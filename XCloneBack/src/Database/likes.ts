import { likeModel } from "../Models/likes";
import { Post, PostModel } from "../Models/posts";

export async function likePost(
  postId: string,
  userId: string
): Promise<Post | null> {
  await likeModel.create({ likedBy: userId, likedOn: postId });
  return await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { likesCount: 1 } },
    { returnDocument: "after" }
  );
}
export async function unlikePost(
  postId: string,
  userId: string
): Promise<Post | null> {
  await likeModel.findOneAndDelete({ likedBy: userId, likedOn: postId });
  return await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { likesCount: -1 }, $max: { likesCount: 0 } },
    { returnDocument: "after" }
  );
}
