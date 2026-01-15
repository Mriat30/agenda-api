import { ProveedorDeFechaYHora } from "../../proveedor_de_tiempo/dominio/proveedor-de-fecha-y-hora";
import { UsuariosRepositorio } from "../../usuario/domain/user-repository";
import { Slot } from "../dominio/slot";
import { TurnoUnico } from "../dominio/turno-unico";
import { TurnosRepositorio } from "../dominio/turnos_repositorio";

export interface AgendarTurnoUnicoDependencias {
  usuariosRepositorio: UsuariosRepositorio;
  turnosRepositorio: TurnosRepositorio;
  proveedorDeFechaYHora: ProveedorDeFechaYHora;
}

export class AgendarTurnoUnico {
  constructor(private readonly dependencias: AgendarTurnoUnicoDependencias) {}

  async agendar(
    telegramId: string,
    masaje: string,
    horaInicio: Date,
    horaFin: Date,
    fecha: Date,
    agendaId: string
  ): Promise<void> {
    const slot = new Slot(horaInicio, horaFin);
    const nuevoTurno = new TurnoUnico(
      telegramId,
      masaje,
      slot,
      fecha,
      agendaId
    );
    await this.validarUsuario(telegramId);
    this.validarFecha(fecha);
    await this.validarDisponibilidadHorario(fecha, slot);
    await this.dependencias.turnosRepositorio.guardar(nuevoTurno);
  }

  private async validarUsuario(telegramId: string): Promise<void> {
    const usuario =
      await this.dependencias.usuariosRepositorio.obtenerPorTelegramId(
        telegramId
      );
    if (!usuario) {
      throw new UsuarioNoRegistradoError(
        "El usuario no está registrado en el sistema."
      );
    }
  }

  private async validarDisponibilidadHorario(
    fecha: Date,
    slot: Slot
  ): Promise<void> {
    const turnoExistente =
      await this.dependencias.turnosRepositorio.obtenerPorFechaYSlot(
        fecha,
        slot
      );
    if (turnoExistente) {
      throw new HorarioNoDisponibleError(
        "El horario seleccionado no está disponible."
      );
    }
  }

  private validarFecha(fecha: Date): void {
    const ahora = this.dependencias.proveedorDeFechaYHora.ahora();
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

export class UsuarioNoRegistradoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsuarioNoRegistradoError";
  }
}
