import { GetUserByPhoneNumber } from "../application/get-user-by-phone-number";
import { RegisterUser } from "../application/register-user";
import { UserController } from "./rest-api/user-controller";
import { PrismaUserRepository } from "./user-repository/prisma-user-repository";

const userRepository = new PrismaUserRepository();
const registerUser = new RegisterUser(userRepository);
const getUserByPhoneNumber = new GetUserByPhoneNumber(userRepository);

export const userController = new UserController(
  registerUser,
  getUserByPhoneNumber
);
