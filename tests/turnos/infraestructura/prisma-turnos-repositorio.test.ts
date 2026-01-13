import { prisma } from "../../../src/infraestructure/db/prisma";
import { Slot } from "../../../src/turnos/dominio/slot";
import { TurnoUnico } from "../../../src/turnos/dominio/turno-unico";
import { PrismaTurnosRepositorio } from "../../../src/turnos/infraestructura/repositorio/prisma-turnos-repositorio";
import { DatabaseHelper } from "../../database-helper";

describe("PrismaTurnosRepositorio Integration", () => {
  let repositorio: PrismaTurnosRepositorio;
  const TELEGRAM_ID = "123456789";

  beforeEach(async () => {
    repositorio = new PrismaTurnosRepositorio();
    await DatabaseHelper.cleanDatabase();

    await prisma.user.create({
      data: {
        telegram_id: TELEGRAM_ID,
        name: "Juan",
        last_name: "Perez",
        phone: "11223344",
        address: "Calle Falsa 123",
      },
    });
  });

  afterAll(async () => {
    await DatabaseHelper.disconnect();
  });

  describe("guardar", () => {
    it("deberia guardar un turno unico en la base de datos", async () => {
      const fechaTurno = new Date("2024-08-01T00:00:00Z");
      const horaInicio = new Date("2024-08-01T14:00:00Z");
      const horaFin = new Date("2024-08-01T15:00:00Z");

      const nuevoTurnoUnico = new TurnoUnico(
        TELEGRAM_ID,
        "Masaje deportivo",
        new Slot(horaInicio, horaFin),
        fechaTurno,
        "pendiente"
      );

      await repositorio.guardar(nuevoTurnoUnico);

      const turnoGuardado = await prisma.turnoUnico.findFirst({
        where: { telegramId: TELEGRAM_ID },
      });

      expect(turnoGuardado).not.toBeNull();
      expect(turnoGuardado?.masaje).toEqual("Masaje deportivo");
      expect(turnoGuardado?.estado).toEqual("pendiente");
      expect(turnoGuardado?.horaInicio.getTime()).toEqual(horaInicio.getTime());
      expect(turnoGuardado?.fecha.toISOString().split("T")[0]).toEqual(
        "2024-08-01"
      );
    });
  });

  describe("obtenerTodos", () => {
    it("si no hay turnos unicos, devolver todos devuelve un arreglo vacío", async () => {
      const turnos = await repositorio.obtenerTodos();
      expect(turnos).toEqual([]);
    });
  });
});
