import { ProveedorDeFechaYHoraFake } from "../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";
import {
  AgendarTurnoUnico,
  FechaInvalidaError,
  HorarioNoDisponibleError,
  UsuarioNoRegistradoError,
} from "../../src/turnos/aplicacion/agendar-turno-unico";
import { Slot } from "../../src/turnos/dominio/slot";
import { TurnoUnico } from "../../src/turnos/dominio/turno-unico";
import { TurnosRepositorio } from "../../src/turnos/dominio/turnos_repositorio";
import { User } from "../../src/users/domain/user";
import { UsuariosRepositorio } from "../../src/users/domain/user-repository";

describe("AgendarTurnoUnico", () => {
  let repositorioTurnos: TurnosRepositorio;
  let repositorioUsuarios: UsuariosRepositorio;
  const AGENDA_ID = "123";
  const proveedorFechaYHora = new ProveedorDeFechaYHoraFake(
    new Date("2024-06-30T12:00:00Z")
  );

  beforeEach(() => {
    repositorioTurnos = {
      guardar: jest.fn(),
      obtenerPorFechaYSlot: jest.fn().mockResolvedValue(null),
    } as unknown as jest.Mocked<TurnosRepositorio>;

    repositorioUsuarios = {
      obtenerPorTelegramId: jest
        .fn()
        .mockResolvedValue(
          new User("123456789", "Juan", "Perez", "123456789", "Calle Falsa 123")
        ),
      guardar: jest.fn(),
      borrarTodos: jest.fn(),
    } as unknown as jest.Mocked<UsuariosRepositorio>;
  });

  it("deberia agendar un turno unico y guardarlo en el repositorio, exitosamente", async () => {
    const agendarTurnoUnico = new AgendarTurnoUnico(
      repositorioUsuarios,
      repositorioTurnos,
      proveedorFechaYHora
    );
    const nuevoTurnoUnico = new TurnoUnico(
      "123456789",
      "Masaje relajante",
      new Slot(
        new Date("2024-07-01T10:00:00Z"),
        new Date("2024-07-01T11:00:00Z")
      ),
      new Date("2024-07-01"),
      AGENDA_ID
    );

    await agendarTurnoUnico.agendar(
      nuevoTurnoUnico.telegramId,
      nuevoTurnoUnico.masaje,
      nuevoTurnoUnico.slot.horaInicio,
      nuevoTurnoUnico.slot.horaFin,
      nuevoTurnoUnico.fecha,
      nuevoTurnoUnico.agendaId
    );

    expect(repositorioTurnos.guardar).toHaveBeenCalledWith(nuevoTurnoUnico);
  });

  it("deberia lanzar error si ya existe un turno en el mismo slot y fecha", async () => {
    const proveedorFechaYHora = new ProveedorDeFechaYHoraFake(
      new Date("2024-06-30T12:00:00Z")
    );
    const agendarTurnoUnico = new AgendarTurnoUnico(
      repositorioUsuarios,
      repositorioTurnos,
      proveedorFechaYHora
    );

    const fechaTest = new Date("2024-07-01T00:00:00.000Z");
    const inicioTest = new Date("2024-07-01T10:00:00.000Z");
    const finTest = new Date("2024-07-01T11:00:00.000Z");

    const turnoSuperpuesto = new TurnoUnico(
      "987654321",
      "Masaje deportivo",
      new Slot(inicioTest, finTest),
      fechaTest,
      AGENDA_ID
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
        fechaTest,
        "2"
      )
    ).rejects.toThrow(HorarioNoDisponibleError);
  });

  it("si se quiere agendar un turno en el pasado, deberia lanzarse un error", async () => {
    const proveedorFechaYHora = new ProveedorDeFechaYHoraFake(
      new Date("2024-06-30T12:00:00Z")
    );
    const agendarTurnoUnico = new AgendarTurnoUnico(
      repositorioUsuarios,
      repositorioTurnos,
      proveedorFechaYHora
    );

    const fechaPasada = new Date("2024-06-29T00:00:00.000Z");
    const inicioPasado = new Date("2024-06-29T10:00:00.000Z");
    const finPasado = new Date("2024-06-29T11:00:00.000Z");

    await expect(
      agendarTurnoUnico.agendar(
        "123456789",
        "Masaje relajante",
        inicioPasado,
        finPasado,
        fechaPasada,
        AGENDA_ID
      )
    ).rejects.toThrow(FechaInvalidaError);
  });

  it("si el usuario no esta registrado, deberia lanzarse un error", async () => {
    const proveedorDeFechaYHora = new ProveedorDeFechaYHoraFake(
      new Date("2024-06-30T12:00:00Z")
    );
    const agendarTurnoUnico = new AgendarTurnoUnico(
      repositorioUsuarios,
      repositorioTurnos,
      proveedorDeFechaYHora
    );

    const fechaTest = new Date("2024-07-01T00:00:00.000Z");
    const inicioTest = new Date("2024-07-01T10:00:00.000Z");
    const finTest = new Date("2024-07-01T11:00:00.000Z");

    (
      repositorioUsuarios.obtenerPorTelegramId as jest.Mock
    ).mockResolvedValueOnce(null);

    await expect(
      agendarTurnoUnico.agendar(
        "usuario_no_registrado",
        "Masaje relajante",
        inicioTest,
        finTest,
        fechaTest,
        AGENDA_ID
      )
    ).rejects.toThrow(UsuarioNoRegistradoError);
  });
});
