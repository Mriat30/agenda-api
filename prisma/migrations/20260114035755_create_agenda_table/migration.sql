/*
  Warnings:

  - Added the required column `agenda_id` to the `turno_unico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "turno_unico" ADD COLUMN     "agenda_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "agenda" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracion_turnos_minutos" INTEGER NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horario_atencion_dia" (
    "id" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "agenda_id" TEXT NOT NULL,

    CONSTRAINT "horario_atencion_dia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "horario_atencion_dia" ADD CONSTRAINT "horario_atencion_dia_agenda_id_fkey" FOREIGN KEY ("agenda_id") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turno_unico" ADD CONSTRAINT "turno_unico_agenda_id_fkey" FOREIGN KEY ("agenda_id") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
