-- CreateTable
CREATE TABLE `usuario` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(14) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `data_nascimento` DATE NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fazenda` (
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

    UNIQUE INDEX `fazenda_id_proprietario_key`(`id_proprietario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animal` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `tipoRaca` ENUM('NELORE', 'GIR', 'GIROLANDO', 'BRAHMAN', 'GUREZÁ', 'SINDI', 'ANGUS', 'BRANGUS', 'LIMOUSIN', 'CHIANINA', 'DEVON', 'BELGIAN BLUE', 'HEREFORD', 'CANCHIM', 'TABAPUÃ', 'CARACU', 'SENEPOL', 'CHAROLÊS', 'INDUBRASIL', 'WAGYU', 'SIMMENTAL', 'CRIOULO', 'JERSEY', 'HOLANDÊS', 'MURRAH', 'MESTIÇO', 'OUTROS') NOT NULL,
    `sexo` ENUM('MACHO', 'FEMEA') NOT NULL,
    `composicaoRacial` VARCHAR(255) NULL,
    `dataNascimento` DATE NULL,
    `numeroParticularProprietario` VARCHAR(255) NULL,
    `registro` VARCHAR(255) NULL,
    `status` ENUM('VIVO', 'FALECIDO', 'VENDIDO', 'DOADO', 'ROUBADO') NOT NULL DEFAULT 'VIVO',
    `peso` DOUBLE NULL,
    `id_pai` BIGINT NULL,
    `id_mae` BIGINT NULL,
    `idFazenda` BIGINT NOT NULL,
    `idProprietario` BIGINT NULL,

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
