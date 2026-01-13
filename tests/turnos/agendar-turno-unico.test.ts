import {
  AgendarTurnoUnico,
  HorarioNoDisponibleError,
} from "../../src/turnos/aplicacion/agendar-turno-unico";
import { Slot } from "../../src/turnos/dominio/slot";
import { TurnoUnico } from "../../src/turnos/dominio/turno-unico";
import { TurnosRepositorio } from "../../src/turnos/dominio/turnos_repositorio";

describe("AgendarTurnoUnico", () => {
  let repositorioTurnos: TurnosRepositorio;

  beforeEach(() => {
    repositorioTurnos = {
      guardar: jest.fn(),
      obtenerPorFechaYSlot: jest.fn().mockResolvedValue(null),
    } as unknown as jest.Mocked<TurnosRepositorio>;
  });

  it("deberia agendar un turno unico y guardarlo en el repositorio, exitosamente", async () => {
    const agendarTurnoUnico = new AgendarTurnoUnico(repositorioTurnos);
    const nuevoTurnoUnico = new TurnoUnico(
      "123456789",
      "Masaje relajante",
      new Slot(
        new Date("2024-07-01T10:00:00Z"),
        new Date("2024-07-01T11:00:00Z")
      ),
      new Date("2024-07-01"),
      "pendiente"
    );

    await agendarTurnoUnico.agendar(
      nuevoTurnoUnico.telegramId,
      nuevoTurnoUnico.masaje,
      nuevoTurnoUnico.slot.horaInicio,
      nuevoTurnoUnico.slot.horaFin,
      nuevoTurnoUnico.fecha
    );

    expect(repositorioTurnos.guardar).toHaveBeenCalledWith(nuevoTurnoUnico);
  });

  it("deberia lanzar error si ya existe un turno en el mismo slot y fecha", async () => {
    const agendarTurnoUnico = new AgendarTurnoUnico(repositorioTurnos);

    const fechaTest = new Date("2024-07-01T00:00:00.000Z");
    const inicioTest = new Date("2024-07-01T10:00:00.000Z");
    const finTest = new Date("2024-07-01T11:00:00.000Z");

    const turnoSuperpuesto = new TurnoUnico(
      "987654321",
      "Masaje deportivo",
      new Slot(inicioTest, finTest),
      fechaTest,
      "pendiente"
    );

    (repositorioTurnos.obtenerPorFechaYSlot as jest.Mock).mockResolvedValueOnce(
      turnoSuperpuesto
    );

    await expect(
      agendarTurnoUnico.agendar(
        "123456789",
        "Masaje relajante",
        inicioTest,
        finTest,
        fechaTest
      )
    ).rejects.toThrow(HorarioNoDisponibleError);
  });
});
