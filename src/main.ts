import "./shared/infrastructure/load-env-vars";

import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocumentation from "../swagger.json";
import { config } from "./shared/infrastructure/config";
import { userRouter } from "./users/infrastructure/rest-api/user-router";

const app = express();

function bootstrap() {
  app.use("/users", userRouter);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(
      `[DOCS] - Swagger available at http://localhost:${port}/api-docs`
    );
  });
}

bootstrap();
