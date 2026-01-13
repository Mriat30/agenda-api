import { ProveedorDeFechaYHora } from "../dominio/proveedor-de-fecha-y-hora";

export class ProveedorDeFechaYHoraReal implements ProveedorDeFechaYHora {
  ahora() {
    return new Date();
  }
}
