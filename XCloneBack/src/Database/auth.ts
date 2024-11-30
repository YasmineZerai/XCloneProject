import { blacklistModel } from "../Models/blacklist";
type addTokenArgs = {
  tokenId: string;
  owner: string;
  token: string;
};
export async function addToken(args: addTokenArgs) {
  return await blacklistModel.create(args);
}
export async function getToken(token: string) {
  return await blacklistModel.findOne({ token });
}
