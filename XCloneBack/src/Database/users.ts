import { User, UserModel } from "../Models/user";

type CreateUserArgs = {
  fullName: string;
  password: string;
  profilePicture: string;
  email: string;
};

export async function createUser(args: CreateUserArgs) {
  return await UserModel.create({
    fullName: args.fullName,
    password: args.password,
    email: args.email,
    profilePicture: args.profilePicture,
  });
}

export async function listUsers(): Promise<User[]> {
  return await UserModel.find();
}
export async function getUserByEmail(email: string): Promise<User | null> {
  return await UserModel.findOne({ email });
}
export async function getUserById(userId: string): Promise<User | null> {
  return await UserModel.findOne({ _id: userId });
}
export async function deleteUser(userId: string) {
  return await UserModel.deleteOne({ _id: userId });
}
export async function updateUser(
  args: CreateUserArgs,
  id: string
): Promise<User | null> {
  return await UserModel.findOneAndUpdate({ _id: id }, args, {
    returnDocument: "after",
  });
}
