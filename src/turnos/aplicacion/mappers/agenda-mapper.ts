import { Agenda } from "../../../agenda/dominio/agenda";
import { HorarioDeAtencionPorDia } from "../../../agenda/dominio/horario-de-atencion-por-dia";
import { Slot } from "../../dominio/slot";
import { CrearAgendaDTO } from "../dtos/agenda-dto";

export class AgendaMapper {
  static toDomain(dto: CrearAgendaDTO): Agenda {
    const horarios = dto.horariosDeAtencion.map((h) => {
      const inicio = this.stringToDate(h.horaInicio);
      const fin = this.stringToDate(h.horaFin);

      return new HorarioDeAtencionPorDia(h.dia as any, new Slot(inicio, fin));
    });

    return new Agenda(dto.nombre, dto.duracionTurnoMinutos, horarios);
  }

  private static stringToDate(horaStr: string): Date {
    const [horas, minutos] = horaStr.split(":").map(Number);
    const date = new Date(0);
    date.setUTCHours(horas, minutos, 0, 0);
    return date;
  }
}
