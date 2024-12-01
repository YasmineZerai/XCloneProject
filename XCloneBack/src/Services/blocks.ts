import { blockUser, findBlock } from "../Database/blocks";

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
