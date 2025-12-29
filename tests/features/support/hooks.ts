import { AfterAll, Before, BeforeAll } from "@cucumber/cucumber";

import { prisma } from "../../../src/infraestructure/db/prisma";

BeforeAll(async function () {
  await prisma.$connect();
});

Before(async function () {
  await prisma.$transaction([prisma.user.deleteMany({})]);
});

AfterAll(async function () {
  await prisma.$disconnect();
});
