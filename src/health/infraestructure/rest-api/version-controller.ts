import { Request, Response } from "express";

import versionData from "../../../../version.json";

export class VersionController {
  getVersion(req: Request, res: Response) {
    res.status(200).json({
      name: versionData.name,
      version: versionData.version,
    });
  }
}
