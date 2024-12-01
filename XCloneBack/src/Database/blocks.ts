import { BlocksModel } from "../Models/blocks";

export async function findBlock(userOne: string, userTwo: string) {
  return await BlocksModel.findOne({
    $or: [
      { blocked: userOne, blockedBy: userTwo },
      { blocked: userTwo, blockedBy: userOne },
    ],
  });
}
export async function findBlocked(userId: string, targetUserId: string) {
  return await BlocksModel.findOne({
    blocked: targetUserId,
    blockedBy: userId,
  });
}
export async function blockUser(blockedBy: string, blocked: string) {
  return await BlocksModel.create({ blocked: blocked, blockedBy: blockedBy });
}
export async function unblockUser(blockedBy: string, blocked: string) {
  return await BlocksModel.findOneAndDelete({
    blocked: blocked,
    blockedBy: blockedBy,
  });
}
