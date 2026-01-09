import { prisma } from "../../../infraestructure/db/prisma";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
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

  async findByPhoneNumber(phone: string): Promise<User | null> {
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

  async findByTelegramId(telegramId: string): Promise<User | null> {
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
}
