import { NextFunction, Request, Response } from "express";

export class AutenticacionMiddleware {
  constructor(private readonly container: { autenticador: any }) {}

  public ejecutar = async (req: Request, res: Response, next: NextFunction) => {
    const telegramId = req.headers["x-telegram-id"] as string;

    if (!telegramId) return res.status(401).send();
    const autorizar = await this.container.autenticador.autorizar(telegramId);
    if (!autorizar) return res.status(403).send();

    next();
  };
}
