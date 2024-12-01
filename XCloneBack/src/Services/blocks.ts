import {
  blockUser,
  findBlock,
  findBlocked,
  unblockUser,
} from "../Database/blocks";

export async function blockUserService(userId: string, targetUserId: string) {
  if (userId === targetUserId)
    return {
      success: false,
      status: 400,
      message: "cannot block your account",
    };
  const existingBlock = await findBlock(userId, targetUserId);
  if (existingBlock)
    return {
      success: false,
      status: 404,
      message: "user blocked, cannot do this operation",
    };
  const block = await blockUser(userId, targetUserId);
  return {
    success: true,
    status: 201,
    message: "user blocked successfully",
    payload: { block },
  };
}
export async function unblockUserService(userId: string, targetUserId: string) {
  const existingBlock = await findBlocked(userId, targetUserId);
  if (!existingBlock)
    return {
      success: false,
      status: 404,
      message: "user already not blocked",
    };
  const block = await unblockUser(userId, targetUserId);
  return {
    success: true,
    status: 201,
    message: "user unblocked successfully",
    payload: { block },
  };
}
