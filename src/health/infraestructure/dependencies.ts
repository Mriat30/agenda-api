import { HealthController } from "./rest-api/health-controller";
import { VersionController } from "./rest-api/version-controller";

export const versionController = new VersionController();
export const healthController = new HealthController();
