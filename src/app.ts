import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocumentation from "../swagger.json";
import { healthRouter } from "./health/infraestructure/rest-api/health-router";
import { userRouter } from "./users/infrastructure/rest-api/user-router";

const app = express();

app.use(express.json());

app.use("/", healthRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/users", userRouter);

export { app };
