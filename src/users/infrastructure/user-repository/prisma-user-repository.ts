import { prisma } from "../../../infraestructure/db/prisma";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id || "" },
      update: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      create: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  }

  async getByPhoneNumber(phone: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { phone } });

    if (!prismaUser) return null;

    return new User(
      prismaUser.name,
      prismaUser.email,
      prismaUser.phone,
      prismaUser.id
    );
  }
}
