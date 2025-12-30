import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.post("/", (req, res) => userController.register(req, res));
userRouter.get("/", (req, res) => userController.get(req, res));

export { userRouter };
