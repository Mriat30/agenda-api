import { AgregarMasaje } from "../../../src/masajes/aplicacion/agregar-masaje";
import { Masaje } from "../../../src/masajes/dominio/masaje";
import { MasajesRepositorio } from "../../../src/masajes/dominio/masajes-repositorio";

describe("AgregarMasaje", () => {
  let repositorioMasajes: MasajesRepositorio;

  beforeEach(() => {
    repositorioMasajes = {
      guardar: jest.fn(),
    } as unknown as jest.Mocked<MasajesRepositorio>;
  });

  it("deberia guardar un nuevo masaje en el repositorio", async () => {
    const agregarMasaje = new AgregarMasaje(repositorioMasajes);
    const NOMBRE_MASAJE = "Masaje relajante";

    await agregarMasaje.agregar(NOMBRE_MASAJE);

    expect(repositorioMasajes.guardar).toHaveBeenCalledWith(
      new Masaje(NOMBRE_MASAJE)
    );
  });
});
