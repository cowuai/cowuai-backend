/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Fazenda` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_proprietario` BIGINT NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(50) NOT NULL,
    `pais` VARCHAR(50) NOT NULL,
    `porte` ENUM('PEQUENO', 'MÉDIO', 'GRANDE') NOT NULL,
    `afixo` VARCHAR(255) NOT NULL,
    `prefixo` TINYINT UNSIGNED NOT NULL,
    `sufixo` TINYINT UNSIGNED NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Fazenda_id_proprietario_key`(`id_proprietario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fazenda` ADD CONSTRAINT `Fazenda_id_proprietario_fkey` FOREIGN KEY (`id_proprietario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
