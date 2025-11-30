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
  - Added the required column `data_atualizacao` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vacina_aplicada` DROP FOREIGN KEY `vacina_aplicada_id_animal_fkey`;

-- DropIndex
DROP INDEX `vacina_aplicada_id_animal_fkey` ON `vacina_aplicada`;

-- AlterTable
ALTER TABLE `animal` DROP COLUMN `composicaoRacial`,
    DROP COLUMN `numeroParticularProprietario`,
    ADD COLUMN `composicao_racial` VARCHAR(255) NULL,
    ADD COLUMN `localizacao` VARCHAR(255) NULL,
    ADD COLUMN `numero_particular_proprietario` VARCHAR(255) NULL,
    MODIFY `sexo` ENUM('MACHO', 'FEMEA', 'TODOS') NOT NULL,
    MODIFY `status` ENUM('VIVO', 'FALECIDO', 'VENDIDO', 'DOADO', 'ROUBADO', 'DOENTE', 'REPRODUZINDO') NOT NULL DEFAULT 'VIVO';

-- AlterTable
ALTER TABLE `tipo_vacina` MODIFY `generoAlvo` ENUM('MACHO', 'FEMEA', 'TODOS') NULL,
    MODIFY `frequencia` ENUM('ANUAL', 'SEMESTRAL', 'BIMESTRAL', 'TRIMESTRAL', 'MENSAL', 'DOSE_UNICA', 'REFORCO') NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `data_atualizacao` DATETIME(3) NOT NULL,
    ADD COLUMN `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `localizacao` VARCHAR(255) NULL,
    ADD COLUMN `reset_password_expires` DATETIME(3) NULL,
    ADD COLUMN `reset_password_token` VARCHAR(255) NULL,
    ADD COLUMN `telefone` VARCHAR(20) NULL,
    ADD COLUMN `urlImagem` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `doenca` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(1000) NULL,
    `eh_cronica` BOOLEAN NOT NULL DEFAULT false,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doenca_animal` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_animal` BIGINT NOT NULL,
    `id_doenca` BIGINT NOT NULL,
    `data_diagnostico` DATETIME(3) NOT NULL,
    `em_tratamento` BOOLEAN NOT NULL DEFAULT true,
    `data_inicio_tratamento` DATETIME(3) NULL,
    `data_fim_tratamento` DATETIME(3) NULL,
    `observacoes` VARCHAR(2000) NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    INDEX `doenca_animal_id_animal_idx`(`id_animal`),
    INDEX `doenca_animal_id_doenca_idx`(`id_doenca`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `animal_numero_particular_proprietario_key` ON `animal`(`numero_particular_proprietario`);

-- CreateIndex
CREATE UNIQUE INDEX `fazenda_afixo_key` ON `fazenda`(`afixo`);

-- CreateIndex
CREATE UNIQUE INDEX `tipo_vacina_nome_key` ON `tipo_vacina`(`nome`);

-- AddForeignKey
ALTER TABLE `vacina_aplicada` ADD CONSTRAINT `vacina_aplicada_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doenca_animal` ADD CONSTRAINT `doenca_animal_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doenca_animal` ADD CONSTRAINT `doenca_animal_id_doenca_fkey` FOREIGN KEY (`id_doenca`) REFERENCES `doenca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
