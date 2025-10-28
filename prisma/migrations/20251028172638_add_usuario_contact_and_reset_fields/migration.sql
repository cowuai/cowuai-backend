-- DropForeignKey
ALTER TABLE `vacina_aplicada` DROP FOREIGN KEY `vacina_aplicada_id_animal_fkey`;

-- DropIndex
DROP INDEX `vacina_aplicada_id_animal_fkey` ON `vacina_aplicada`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `data_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `localizacao` VARCHAR(255) NULL,
    ADD COLUMN `reset_password_expires` DATETIME(3) NULL,
    ADD COLUMN `reset_password_token` VARCHAR(255) NULL,
    ADD COLUMN `telefone` VARCHAR(20) NULL,
    ADD COLUMN `urlImagem` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `vacina_aplicada` ADD CONSTRAINT `vacina_aplicada_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
