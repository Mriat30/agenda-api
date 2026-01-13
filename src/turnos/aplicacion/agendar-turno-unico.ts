import { ProveedorDeFechaYHora } from "../../proveedor_de_tiempo/dominio/proveedor-de-fecha-y-hora";
import { Slot } from "../dominio/slot";
import { TurnoUnico } from "../dominio/turno-unico";
import { TurnosRepositorio } from "../dominio/turnos_repositorio";

export class AgendarTurnoUnico {
  constructor(
    private readonly turnosRepositorio: TurnosRepositorio,
    private readonly proveedorDeFechaYHora: ProveedorDeFechaYHora
  ) {}

  async agendar(
    telegramId: string,
    masaje: string,
    horaInicio: Date,
    horaFin: Date,
    fecha: Date
  ): Promise<void> {
    const slot = new Slot(horaInicio, horaFin);
    const nuevoTurno = new TurnoUnico(
      telegramId,
      masaje,
      slot,
      fecha,
      "pendiente"
    );
    const disponible = await this.esHorarioDisponible(fecha, slot);
    if (!disponible) {
      throw new HorarioNoDisponibleError(
        "El horario seleccionado no está disponible."
      );
    }
    this.validarFecha(fecha);
    await this.turnosRepositorio.guardar(nuevoTurno);
  }

  private async esHorarioDisponible(fecha: Date, slot: Slot): Promise<boolean> {
    const turnoExistente = await this.turnosRepositorio.obtenerPorFechaYSlot(
      fecha,
      slot
    );
    return turnoExistente === null;
  }

  private validarFecha(fecha: Date): void {
    const ahora = this.proveedorDeFechaYHora.ahora();
    if (fecha < ahora) {
      throw new FechaInvalidaError("La fecha del turno no puede ser pasada.");
    }
  }
}

export class HorarioNoDisponibleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HorarioNoDisponibleError";
  }
}

export class FechaInvalidaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FechaInvalidaError";
  }
}
