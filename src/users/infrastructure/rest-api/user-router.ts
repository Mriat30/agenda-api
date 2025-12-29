import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.post("/", (req, res) => userController.register(req, res));

export { userRouter };
