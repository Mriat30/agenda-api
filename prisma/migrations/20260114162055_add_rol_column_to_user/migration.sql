-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'CLIENTE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'CLIENTE';
