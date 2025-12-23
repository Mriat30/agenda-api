import express from "express";

import { healthController, versionController } from "../dependencies";

const healthRouter = express.Router();

healthRouter.get("/", healthController.run.bind(healthController));

healthRouter.get(
  "/version",
  versionController.getVersion.bind(versionController)
);

export { healthRouter };
