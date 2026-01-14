import { Router } from "express";

import { agendasControlador, authMiddleware } from "../dependencias";

const agendaRouter = Router();

agendaRouter.post("/", authMiddleware.ejecutar, (req, res) =>
  agendasControlador.post(req, res)
);

export { agendaRouter };
