-- CreateTable
CREATE TABLE "turno_unico" (
    "id" TEXT NOT NULL,
    "telegram_id" TEXT NOT NULL,
    "masaje" TEXT NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "fecha" DATE NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "turno_unico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "turno_unico" ADD CONSTRAINT "turno_unico_telegram_id_fkey" FOREIGN KEY ("telegram_id") REFERENCES "User"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;
