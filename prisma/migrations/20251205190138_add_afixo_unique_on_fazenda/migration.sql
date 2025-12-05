/*
  Warnings:

  - A unique constraint covering the columns `[afixo]` on the table `fazenda` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fazenda_afixo_key` ON `fazenda`(`afixo`);
