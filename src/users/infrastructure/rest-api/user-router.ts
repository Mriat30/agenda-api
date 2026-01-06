import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.post("/", userController.register.bind(userController));
userRouter.get("/", userController.get.bind(userController));

export { userRouter };
