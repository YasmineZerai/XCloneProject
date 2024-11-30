import { blockUser } from "../Database/blocks";

export async function blockUserService(userId: string, targetUserId: string) {
  if (userId === targetUserId)
    return {
      success: false,
      status: 400,
      message: "cannot block your account",
    };

  const block = await blockUser(userId, targetUserId);
  return {
    success: true,
    status: 201,
    message: "user blocked successfully",
    payload: { block },
  };
}
