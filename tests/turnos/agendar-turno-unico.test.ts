import { AgendarTurnoUnico } from "../../src/turnos/aplicacion/agendar-turno-unico";
import { Slot } from "../../src/turnos/dominio/slot";
import { TurnoUnico } from "../../src/turnos/dominio/turno-unico";
import { TurnosRepositorio } from "../../src/turnos/dominio/turnos_repositorio";

describe("AgendarTurnoUnico", () => {
  let repositorioTurnos: TurnosRepositorio;

  beforeEach(() => {
    repositorioTurnos = {
      guardar: jest.fn(),
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
});
