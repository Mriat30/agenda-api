import { PrismaClient } from "@prisma/client";

import { Agenda } from "../../../src/agenda/dominio/agenda";
import { HorarioDeAtencionPorDia } from "../../../src/agenda/dominio/horario-de-atencion-por-dia";
import { PrismaAgendaRepositorio } from "../../../src/agenda/infraestructura/prisma-agendas-repositorio";
import { Slot } from "../../../src/turnos/dominio/slot";

describe("PrismaAgendaRepository Integration Test", () => {
  let prisma: PrismaClient;
  let repo: PrismaAgendaRepositorio;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.horarioDeAtencionPorDia.deleteMany();
    await prisma.agenda.deleteMany();
    await prisma.$disconnect();
  });

  it("debería persistir una agenda con sus horarios en la base de datos", async () => {
    repo = new PrismaAgendaRepositorio(prisma);
    const inicio = new Date(0);
    inicio.setUTCHours(9, 0);
    const fin = new Date(0);
    fin.setUTCHours(18, 0);

    const agenda = new Agenda(
      "Agenda Test",
      30,
      [new HorarioDeAtencionPorDia("LUNES", new Slot(inicio, fin))],
      "id-unico-123"
    );

    await repo.guardar(agenda);

    const agendaEnDb = await prisma.agenda.findUnique({
      where: { id: "id-unico-123" },
      include: { horariosDeAtencion: true },
    });

    expect(agendaEnDb).toBeDefined();
    expect(agendaEnDb?.nombre).toBe("Agenda Test");
    expect(agendaEnDb?.horariosDeAtencion).toHaveLength(1);
    expect(agendaEnDb?.horariosDeAtencion[0].dia).toBe("LUNES");
  });
});
