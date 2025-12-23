import "./shared/infrastructure/load-env-vars";

import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocumentation from "../swagger.json";
import { healthRouter } from "./health/infraestructure/rest-api/health-router";
import { Configuration } from "./shared/infrastructure/config/configuration";
import { userRouter } from "./users/infrastructure/rest-api/user-router";

const app = express();

function bootstrap() {
  app.use("/", healthRouter);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
  app.use("/users", userRouter);

  const port = Configuration.getPort();

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(
      `[DOCS] - Swagger available at http://localhost:${port}/api-docs`
    );
  });
}

bootstrap();
