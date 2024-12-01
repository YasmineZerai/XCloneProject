import { updatePostController } from "../Controllers/posts";
import { findBlock } from "../Database/blocks";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  listUsers,
  updateUser,
} from "../Database/users";
import { User } from "../Models/user";
import bcrypt from "bcrypt";
type CreateUserArgs = {
  fullName: string;
  password: string;
  profilePicture: string;
  email: string;
};

export async function createUserService(args: CreateUserArgs) {
  const existingUser = await getUserByEmail(args.email);
  if (existingUser) {
    return {
      success: false,
      status: 409,
      message: "email already taken",
    };
  }
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const newUser = await createUser({
    fullName: args.fullName,
    password: hashedPassword,
    profilePicture: args.profilePicture,
    email: args.email,
  });
  return {
    success: true,
    status: 200,
    message: "user created successfully",
    payload: { userId: newUser._id },
  };
}
//TODO: handle it depending on the query
export async function listUsersService() {
  return await listUsers();
}
export async function getUserService(userId: string, loggedUser: string) {
  const user = await getUserById(userId);
  if (!user) return { success: false, status: 404, message: "user not found" };
  const existingBlock = await findBlock(userId, loggedUser);
  if (existingBlock)
    return {
      success: false,
      status: 403,
      message: "cannot get user, user blocked",
    };
  return {
    success: true,
    status: 201,
    message: "user fetched successfully",
    payload: { user },
  };
}
export async function deleteUserService(userId: string) {
  return await deleteUser(userId);
}
export async function updateUserService(
  args: CreateUserArgs,
  id: string
): Promise<User | null> {
  if (args.password) {
    const newHashedPassword = await bcrypt.hash(args.password, 10);
    args["password"] = newHashedPassword;
  }
  return await updateUser(args, id);
}
