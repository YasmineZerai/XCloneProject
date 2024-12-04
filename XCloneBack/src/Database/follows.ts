import { followsModel } from "../Models/follows";
import { UserModel } from "../Models/user";

export async function getFollowerById(followerId: string, followingId: string) {
  return await followsModel.findOne({
    follower: followerId,
    following: followingId,
  });
}
export async function followUser(followerId: string, followingId: string) {
  const follow = await followsModel.create({
    follower: followerId,
    following: followingId,
    createdAt: new Date(),
  });
  await UserModel.findByIdAndUpdate(followerId, {
    $inc: { followingCount: 1 },
  });
  await UserModel.findByIdAndUpdate(followingId, {
    $inc: { followersCount: 1 },
  });
  return follow;
}
export async function unfollowUser(followerId: string, followingId: string) {
  const follow = followsModel.findOneAndDelete({
    follower: followerId,
    following: followingId,
  });
  await UserModel.findByIdAndUpdate(followerId, {
    $inc: { followingCount: -1 },
  });
  await UserModel.findByIdAndUpdate(followingId, {
    $inc: { followersCount: -1 },
  });
  return follow;
}
export async function listFollowers(userId: string) {
  const followers = await followsModel
    .find({ following: userId })
    .populate("follower", "-password");
  return followers.map((follow) => follow.follower);
}
