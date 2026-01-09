import { GetUserByPhoneNumber } from "../application/get-user-by-phone-number";
import { GetUserByTelegramId } from "../application/get-user-by-telegram-id";
import { RegisterUser } from "../application/register-user";
import { UserController } from "./rest-api/user-controller";
import { PrismaUserRepository } from "./user-repository/prisma-user-repository";

const userRepository = new PrismaUserRepository();
const registerUser = new RegisterUser(userRepository);
const getUserByPhoneNumber = new GetUserByPhoneNumber(userRepository);
const getUserByTelegramId = new GetUserByTelegramId(userRepository);

export const userController = new UserController(
  registerUser,
  getUserByPhoneNumber,
  getUserByTelegramId
);
