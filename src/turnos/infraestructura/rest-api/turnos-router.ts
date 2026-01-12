import express from "express";

import { turnosController } from "../dependencias";

const turnosRouter = express.Router();

turnosRouter.post("/", turnosController.post.bind(turnosController));

export { turnosRouter };
