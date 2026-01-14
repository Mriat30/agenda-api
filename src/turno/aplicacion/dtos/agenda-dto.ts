export interface CrearAgendaDTO {
  nombre: string;
  duracionTurnoMinutos: number;
  horariosDeAtencion: Array<{
    dia:
      | "LUNES"
      | "MARTES"
      | "MIERCOLES"
      | "JUEVES"
      | "VIERNES"
      | "SABADO"
      | "DOMINGO";
    horaInicio: string;
    horaFin: string;
  }>;
}

export interface AgendaRespuestaDTO {
  id: string;
  nombre: string;
  duracionTurnoMinutos: number;
  turnosTotalesCalculados: number;
  horarios: Array<{
    dia: string;
    rango: string;
  }>;
}
