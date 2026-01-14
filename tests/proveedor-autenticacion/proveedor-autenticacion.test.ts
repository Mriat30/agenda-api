import { ProveedorAutenticacion } from "../../src/proveedor-autenticacion/infraestructura/proveedor-autenticacion";
import { UsuariosRepositorio } from "../../src/usuario/domain/user-repository";

describe("ProveedorAutenticacion", () => {
  let usuariosRepositorio: UsuariosRepositorio;
  let proveedorAutenticacion: ProveedorAutenticacion;

  beforeEach(() => {
    usuariosRepositorio = {
      obtenerPorTelegramId: jest.fn(),
    } as unknown as UsuariosRepositorio;
  });

  it("debería retornar true si el usuario es admin", async () => {
    (usuariosRepositorio.obtenerPorTelegramId as jest.Mock).mockResolvedValue({
      rol: "ADMIN",
    });

    proveedorAutenticacion = new ProveedorAutenticacion(usuariosRepositorio);
    const esAdmin = await proveedorAutenticacion.esAdmin("some-telegram-id");

    expect(esAdmin).toBe(true);
  });
});
