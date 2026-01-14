import { CrearAgendaDTO } from "../../../src/turno/aplicacion/dtos/agenda-dto";
import { AgendaMapper } from "../../../src/turno/aplicacion/mappers/agenda-mapper";

describe("AgendaMapper con fechas", () => {
  it("debería convertir los strings del DTO en objetos Date dentro del Slot", () => {
    const dto: CrearAgendaDTO = {
      nombre: "Agenda Matutina",
      duracionTurnoMinutos: 60,
      horariosDeAtencion: [
        { dia: "LUNES", horaInicio: "09:30", horaFin: "12:00" },
      ],
    };

    const resultado = AgendaMapper.toDomain(dto);
    const slotMapeado =
      resultado.horariosDeAtencionPorDia[0].intervaloDeAtencion;

    expect(slotMapeado.horaInicio).toBeInstanceOf(Date);
    expect(slotMapeado.horaFin).toBeInstanceOf(Date);

    expect(slotMapeado.horaInicio.getUTCHours()).toBe(9);
    expect(slotMapeado.horaInicio.getUTCMinutes()).toBe(30);
  });
});
