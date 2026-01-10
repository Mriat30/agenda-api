import { ProveedorDeFechaYHora } from "../dominio/proveedor-de-fecha-y-hora";

export class ProveedorDeFechaYHoraFake implements ProveedorDeFechaYHora {
  constructor(private readonly fechaYHora: Date) {}

  ahora() {
    return this.fechaYHora;
  }
}
