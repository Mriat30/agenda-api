import { setWorldConstructor, World } from "@cucumber/cucumber";

export class CustomWorld extends World {
  constructor(options: never) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
