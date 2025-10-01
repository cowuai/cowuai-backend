-- DropForeignKey
ALTER TABLE `fazenda` DROP FOREIGN KEY `Fazenda_id_proprietario_fkey`;

-- CreateTable
CREATE TABLE `animal` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `tipoRaca` ENUM('NELORE', 'GIR', 'GIROLANDO', 'BRAHMAN', 'GUREZÁ', 'SINDI', 'ANGUS', 'BRANGUS', 'LIMOUSIN', 'CHIANINA', 'DEVON', 'BELGIAN BLUE', 'HEREFORD', 'CANCHIM', 'TABAPUÃ', 'CARACU', 'SENEPOL', 'CHAROLÊS', 'INDUBRASIL', 'WAGYU', 'SIMMENTAL', 'CRIOULO', 'JERSEY', 'HOLANDÊS', 'MURRAH', 'MESTIÇO', 'OUTROS') NOT NULL,
    `composicaoRacial` VARCHAR(255) NULL,
    `dataNascimento` DATE NULL,
    `numeroParticularProprietario` VARCHAR(255) NULL,
    `registro` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `peso` DOUBLE NULL,
    `id_pai` BIGINT NULL,
    `id_mae` BIGINT NULL,
    `idFazenda` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `idUsuario` BIGINT NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `dispositivo` VARCHAR(255) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RefreshToken_token_key`(`token`),
    UNIQUE INDEX `RefreshToken_idUsuario_dispositivo_key`(`idUsuario`, `dispositivo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fazenda` ADD CONSTRAINT `fazenda_id_proprietario_fkey` FOREIGN KEY (`id_proprietario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal` ADD CONSTRAINT `animal_id_pai_fkey` FOREIGN KEY (`id_pai`) REFERENCES `animal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal` ADD CONSTRAINT `animal_id_mae_fkey` FOREIGN KEY (`id_mae`) REFERENCES `animal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal` ADD CONSTRAINT `animal_idFazenda_fkey` FOREIGN KEY (`idFazenda`) REFERENCES `fazenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `fazenda` RENAME INDEX `Fazenda_id_proprietario_key` TO `fazenda_id_proprietario_key`;
