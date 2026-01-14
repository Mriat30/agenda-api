import { CrearAgenda } from "../../src/agenda/aplicacion/crear-agenda";
import { Agenda } from "../../src/agenda/dominio/agenda";
import { AgendasRepositorio } from "../../src/agenda/dominio/agendas-repositorio";

describe("CrearAgenda", () => {
  let repositorioAgendas: AgendasRepositorio;

  beforeEach(() => {
    repositorioAgendas = {
      guardar: jest.fn(),
    } as any;
  });

  it("debería guardar la agenda proporcionada en el repositorio", async () => {
    const crearAgenda = new CrearAgenda(repositorioAgendas);
    const agendaAAgregar = new Agenda("Agenda de masajes", 60, []);

    await crearAgenda.crear(agendaAAgregar);

    expect(repositorioAgendas.guardar).toHaveBeenCalledWith(agendaAAgregar);

    expect(repositorioAgendas.guardar).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: "Agenda de masajes",
        duracionTurnosEnMinutos: 60,
      })
    );
  });
});
