import { AfterAll, Before, BeforeAll } from "@cucumber/cucumber";

import { prisma } from "../../../src/infraestructure/db/prisma";
import { CustomWorld } from "./world";

BeforeAll(async function () {
  await prisma.$connect();
});

Before(async function (this: CustomWorld) {
  await this.cleanDatabase();
});

AfterAll(async function () {
  await prisma.$disconnect();
});
