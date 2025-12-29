import "./shared/infrastructure/load-env-vars";

import { app } from "./app";
import { Configuration } from "./shared/infrastructure/config/configuration";

const port = Configuration.getPort();

function bootstrap() {
  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(
      `[DOCS] - Swagger available at http://localhost:${port}/api-docs`
    );
  });
}

bootstrap();
