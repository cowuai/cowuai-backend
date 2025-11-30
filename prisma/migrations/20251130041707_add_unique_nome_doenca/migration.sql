/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `doenca` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `doenca_nome_key` ON `doenca`(`nome`);
