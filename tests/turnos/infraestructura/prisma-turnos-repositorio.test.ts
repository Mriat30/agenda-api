import { prisma } from "../../../src/infraestructure/db/prisma";
import { Slot } from "../../../src/turnos/dominio/slot";
import { TurnoUnico } from "../../../src/turnos/dominio/turno-unico";
import { PrismaTurnosRepositorio } from "../../../src/turnos/infraestructura/repositorio/prisma-turnos-repositorio";
import { DatabaseHelper } from "../../database-helper";

describe("PrismaTurnosRepositorio Integration", () => {
  let repositorio: PrismaTurnosRepositorio;
  let agendaId: string;
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

    const agenda = await prisma.agenda.create({
      data: {
        nombre: "Agenda General",
        duracionTurnosEnMinutos: 60,
      },
    });
    agendaId = agenda.id;
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
        agendaId
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

    it("deberia devolver todos los turnos unicos guardados", async () => {
      const fechaTurno1 = new Date("2024-08-01T00:00:00Z");
      const horaInicio1 = new Date("2024-08-01T14:00:00Z");
      const horaFin1 = new Date("2024-08-01T15:00:00Z");
      const turnoUnico1 = new TurnoUnico(
        TELEGRAM_ID,
        "Masaje relajante",
        new Slot(horaInicio1, horaFin1),
        fechaTurno1,
        agendaId
      );
      const fechaTurno2 = new Date("2024-08-02T00:00:00Z");
      const horaInicio2 = new Date("2024-08-02T16:00:00Z");
      const horaFin2 = new Date("2024-08-02T17:00:00Z");
      const turnoUnico2 = new TurnoUnico(
        TELEGRAM_ID,
        "Masaje deportivo",
        new Slot(horaInicio2, horaFin2),
        fechaTurno2,
        agendaId
      );
      await repositorio.guardar(turnoUnico1);
      await repositorio.guardar(turnoUnico2);

      const turnos = await repositorio.obtenerTodos();

      expect(turnos.length).toBe(2);
      const masajes = turnos.map((t) => t.masaje);
      expect(masajes).toContain("Masaje relajante");
      expect(masajes).toContain("Masaje deportivo");
    });
  });

  describe("borrarTodos", () => {
    it("deberia borrar todos los turnos unicos de la base de datos", async () => {
      const fechaTurno = new Date("2024-08-01T00:00:00Z");
      const horaInicio = new Date("2024-08-01T14:00:00Z");
      const horaFin = new Date("2024-08-01T15:00:00Z");

      const turnoUnico = new TurnoUnico(
        TELEGRAM_ID,
        "Masaje relajante",
        new Slot(horaInicio, horaFin),
        fechaTurno,
        agendaId
      );

      await repositorio.guardar(turnoUnico);

      let turnos = await repositorio.obtenerTodos();

      await repositorio.borrarTodos();

      turnos = await repositorio.obtenerTodos();
      expect(turnos.length).toBe(0);
    });
  });

  describe("obtenerPorFechaYSlot", () => {
    it("deberia devolver null si no encuentra coincidencia", async () => {
      const resultado = await repositorio.obtenerPorFechaYSlot(
        new Date("2024-08-01T00:00:00Z"),
        new Slot(
          new Date("2024-08-01T14:00:00Z"),
          new Date("2024-08-01T15:00:00Z")
        )
      );
      expect(resultado).toBeNull();
    });

    it("deberia devolver el turno unico si encuentra coincidencia", async () => {
      const fechaTurno = new Date("2024-08-01T00:00:00Z");
      const horaInicio = new Date("2024-08-01T14:00:00Z");
      const horaFin = new Date("2024-08-01T15:00:00Z");

      const turnoUnico = new TurnoUnico(
        TELEGRAM_ID,
        "Masaje relajante",
        new Slot(horaInicio, horaFin),
        fechaTurno,
        agendaId
      );

      await repositorio.guardar(turnoUnico);

      const resultado = await repositorio.obtenerPorFechaYSlot(
        fechaTurno,
        new Slot(horaInicio, horaFin)
      );

      expect(resultado?.masaje).toBe("Masaje relajante");
    });
  });
});
