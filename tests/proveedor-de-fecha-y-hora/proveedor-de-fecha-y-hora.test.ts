import { ProveedorDeFechaYHoraFake } from "../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";
import { ProveedorDeFechaYHoraReal } from "../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-real";

describe("ProveedorDeFechaYHoraFake", () => {
  it("ahora debe devolver la fecha pasada en el constructor", () => {
    const fechaEsperada = new Date(2022, 0, 1, 12, 0, 0);
    const proveedor = new ProveedorDeFechaYHoraFake(fechaEsperada);
    const fechaObtenida = proveedor.ahora();
    expect(fechaObtenida).toEqual(fechaEsperada);
  });
});

describe("ProveedorDeFechaYHoraReal", () => {
  it("ahora debe devolver la fecha actual", () => {
    const proveedor = new ProveedorDeFechaYHoraReal();
    const fechaObtenida = proveedor.ahora();
    const fechaActual = new Date();
    expect(
      Math.abs(fechaObtenida.getTime() - fechaActual.getTime())
    ).toBeLessThan(1000);
  });
});
