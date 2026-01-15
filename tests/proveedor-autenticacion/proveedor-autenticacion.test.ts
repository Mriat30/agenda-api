import {
  ProveedorAutenticacion,
  UsuarioNoAutorizadoError,
} from "../../src/proveedor-autenticacion/infraestructura/proveedor-autenticacion";
import { User } from "../../src/usuario/domain/user";
import { UsuariosRepositorio } from "../../src/usuario/domain/user-repository";

describe("ProveedorAutenticacion", () => {
  let usuariosRepositorio: UsuariosRepositorio;
  let proveedorAutenticacion: ProveedorAutenticacion;

  beforeEach(() => {
    usuariosRepositorio = {
      obtenerPorTelegramId: jest.fn(),
    } as unknown as UsuariosRepositorio;
    proveedorAutenticacion = new ProveedorAutenticacion(usuariosRepositorio);
  });

  it("debería autorizar exitosamente si el usuario es admin", async () => {
    const adminUser = new User(
      "some-telegram-id",
      "Juan",
      "Perez",
      "123456",
      "Calle 123",
      "ADMIN"
    );

    (usuariosRepositorio.obtenerPorTelegramId as jest.Mock).mockResolvedValue(
      adminUser
    );

    await expect(
      proveedorAutenticacion.autorizar("some-telegram-id")
    ).resolves.not.toThrow();
  });

  it("si el usuario no esta autorizado deberia lanzar error", async () => {
    const normalUser = new User(
      "some-telegram-id",
      "Juan",
      "Perez",
      "123456",
      "Calle 123",
      "CLIENTE"
    );

    (usuariosRepositorio.obtenerPorTelegramId as jest.Mock).mockResolvedValue(
      normalUser
    );

    await expect(
      proveedorAutenticacion.autorizar("some-telegram-id")
    ).rejects.toThrow(UsuarioNoAutorizadoError);
  });
});
