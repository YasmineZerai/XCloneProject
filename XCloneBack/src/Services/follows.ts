import { followUser, getFollowerById, unfollowUser } from "../Database/follows";
import { getUserById } from "../Database/users";

export async function followUserService(following: string, follower: string) {
  if (following === follower)
    return {
      success: false,
      status: 400,
      message: "cannot follow your account",
    };
  const followingUser = await getUserById(following);
  if (!followingUser)
    return { success: false, status: 404, message: "no user with this id" };
  const existingFollow = await getFollowerById(follower, following);
  if (existingFollow)
    return {
      success: false,
      status: 400,
      message: "you already follow this account",
    };
  const follow = await followUser(follower, following);
  return {
    success: true,
    status: 200,
    message: "user followed successfully",
    payload: { follow },
  };
}
export async function unfollowUserService(following: string, follower: string) {
  if (following === follower)
    return {
      success: false,
      status: 400,
      message: "cannot unfollow your account",
    };
  const followingUser = await getUserById(following);
  if (!followingUser)
    return { success: false, status: 404, message: "no user with this id" };
  const existingFollow = await getFollowerById(follower, following);
  if (!existingFollow)
    return {
      success: false,
      status: 400,
      message: "you dont follow this account",
    };
  const follow = await unfollowUser(follower, following);
  return {
    success: true,
    status: 200,
    message: "user unfollowed successfully",
    payload: { follow },
  };
}
