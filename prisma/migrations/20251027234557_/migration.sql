-- DropForeignKey
ALTER TABLE `vacina_aplicada` DROP FOREIGN KEY `vacina_aplicada_id_animal_fkey`;

-- DropIndex
DROP INDEX `vacina_aplicada_id_animal_fkey` ON `vacina_aplicada`;

-- AddForeignKey
ALTER TABLE `vacina_aplicada` ADD CONSTRAINT `vacina_aplicada_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
