import { GetUserByPhoneNumber } from "../application/get-user-by-phone-number";
import { GetUserByTelegramId } from "../application/get-user-by-telegram-id";
import { RegisterUser } from "../application/register-user";
import { UserController } from "./rest-api/user-controller";
import { PrismaUsuariosRepositorio } from "./user-repository/prisma-usuarios-repositorio";

const UsuariosRepositorio = new PrismaUsuariosRepositorio();
const registerUser = new RegisterUser(UsuariosRepositorio);
const getUserByPhoneNumber = new GetUserByPhoneNumber(UsuariosRepositorio);
const getUserByTelegramId = new GetUserByTelegramId(UsuariosRepositorio);

export const userController = new UserController(
  registerUser,
  getUserByPhoneNumber,
  getUserByTelegramId
);
