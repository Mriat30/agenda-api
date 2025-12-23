import "./shared/infrastructure/load-env-vars";

import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocumentation from "../swagger.json";
import { Configuration } from "./config/configuration";
import { versionRouter } from "./health/infraestructure/version-router";
import { userRouter } from "./users/infrastructure/rest-api/user-router";

const app = express();

function bootstrap() {
  app.use("/users", userRouter);
  app.use("/version", versionRouter);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

  const port = Configuration.getPort();

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(
      `[DOCS] - Swagger available at http://localhost:${port}/api-docs`
    );
  });
}

bootstrap();
