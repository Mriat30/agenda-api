import { prisma } from "../../../infraestructure/db/prisma";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        slackUserId: user.phone,
      },
      create: {
        id: user.id,
        email: user.email,
        slackUserId: user.phone,
      },
    });
  }

  async getById(id: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { id } });

    if (!prismaUser) return null;

    return new User(
      prismaUser.id,
      "",
      prismaUser.email,
      prismaUser.slackUserId
    );
  }
}
