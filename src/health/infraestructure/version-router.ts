import express from "express";

import { versionController } from "./dependencies";

const versionRouter = express.Router();

versionRouter.get("/", versionController.getVersion.bind(versionController));

export { versionRouter };
