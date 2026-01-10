import { ProveedorDeFechaYHoraFake } from "../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";

describe("ProveedorDeFechaYHoraFake", () => {
  it("ahora debe devolver la fecha pasada en el constructor", () => {
    const fechaEsperada = new Date(2022, 0, 1, 12, 0, 0);
    const proveedor = new ProveedorDeFechaYHoraFake(fechaEsperada);
    const fechaObtenida = proveedor.ahora();
    expect(fechaObtenida).toEqual(fechaEsperada);
  });
});
