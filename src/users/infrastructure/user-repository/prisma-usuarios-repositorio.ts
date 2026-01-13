import { prisma } from "../../../infraestructure/db/prisma";
import { RepositorioBase } from "../../../shared/domain/repositorio_base";
import { User } from "../../domain/user";
import { UsuariosRepositorio } from "../../domain/user-repository";

export class PrismaUsuariosRepositorio
  implements UsuariosRepositorio, RepositorioBase<User>
{
  async guardar(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { telegram_id: user.telegramId },
      update: {
        name: user.name,
        last_name: user.lastName,
        phone: user.phone,
        address: user.address,
      },
      create: {
        telegram_id: user.telegramId,
        name: user.name,
        last_name: user.lastName,
        phone: user.phone,
        address: user.address,
      },
    });
  }

  async obtenerPorNumeroDeTelefono(phone: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { phone } });

    if (!prismaUser) return null;

    return new User(
      prismaUser.telegram_id,
      prismaUser.name,
      prismaUser.last_name,
      prismaUser.phone,
      prismaUser.address,
      prismaUser.id
    );
  }

  async obtenerPorTelegramId(telegramId: string): Promise<User | null> {
    const telegram_id = telegramId;
    const prismaUser = await prisma.user.findUnique({ where: { telegram_id } });

    if (!prismaUser) return null;

    return new User(
      prismaUser.telegram_id,
      prismaUser.name,
      prismaUser.last_name,
      prismaUser.phone,
      prismaUser.address,
      prismaUser.id
    );
  }

  async obtenerTodos(): Promise<User[]> {
    const prismaUsers = await prisma.user.findMany();

    if (prismaUsers.length > 0) {
      return prismaUsers.map(
        (prismaUser) =>
          new User(
            prismaUser.telegram_id,
            prismaUser.name,
            prismaUser.last_name,
            prismaUser.phone,
            prismaUser.address,
            prismaUser.id
          )
      );
    }
    return [];
  }

  async borrarTodos(): Promise<void> {
    await prisma.user.deleteMany();
  }
}
