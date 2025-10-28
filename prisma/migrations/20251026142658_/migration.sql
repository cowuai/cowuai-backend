/*
  Warnings:

  - You are about to drop the column `composicaoRacial` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `numeroParticularProprietario` on the `animal` table. All the data in the column will be lost.
  - The values [INDETERMINADO] on the enum `tipo_vacina_generoAlvo` will be removed. If these variants are still used in the database, this will fail.
  - The values [INDETERMINADO] on the enum `tipo_vacina_generoAlvo` will be removed. If these variants are still used in the database, this will fail.
  - The values [UNICA] on the enum `tipo_vacina_frequencia` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[numero_particular_proprietario]` on the table `animal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[afixo]` on the table `fazenda` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `tipo_vacina` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `localizacao` to the `animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `animal` DROP COLUMN `composicaoRacial`,
    DROP COLUMN `numeroParticularProprietario`,
    ADD COLUMN `composicao_racial` VARCHAR(255) NULL,
    ADD COLUMN `localizacao` VARCHAR(255) NOT NULL,
    ADD COLUMN `numero_particular_proprietario` VARCHAR(255) NULL,
    MODIFY `sexo` ENUM('MACHO', 'FEMEA', 'TODOS') NOT NULL;

-- AlterTable
ALTER TABLE `tipo_vacina` MODIFY `generoAlvo` ENUM('MACHO', 'FEMEA', 'TODOS') NULL,
    MODIFY `frequencia` ENUM('ANUAL', 'SEMESTRAL', 'BIMESTRAL', 'TRIMESTRAL', 'MENSAL', 'DOSE_UNICA', 'REFORCO') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `animal_numero_particular_proprietario_key` ON `animal`(`numero_particular_proprietario`);

-- CreateIndex
CREATE UNIQUE INDEX `fazenda_afixo_key` ON `fazenda`(`afixo`);

-- CreateIndex
CREATE UNIQUE INDEX `tipo_vacina_nome_key` ON `tipo_vacina`(`nome`);
