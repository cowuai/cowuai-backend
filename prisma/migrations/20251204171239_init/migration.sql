-- CreateTable
CREATE TABLE `usuario` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(14) NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NULL,
    `data_nascimento` DATE NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `telefone` VARCHAR(20) NULL,
    `localizacao` VARCHAR(255) NULL,
    `urlImagem` VARCHAR(255) NULL,
    `reset_password_token` VARCHAR(255) NULL,
    `reset_password_expires` DATETIME(3) NULL,
    `google_id` VARCHAR(255) NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    UNIQUE INDEX `usuario_google_id_key`(`google_id`),
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animal` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `tipoRaca` ENUM('NELORE', 'GIR', 'GIROLANDO', 'BRAHMAN', 'GUREZÁ', 'SINDI', 'ANGUS', 'BRANGUS', 'LIMOUSIN', 'CHIANINA', 'DEVON', 'BELGIAN BLUE', 'HEREFORD', 'CANCHIM', 'TABAPUÃ', 'CARACU', 'SENEPOL', 'CHAROLÊS', 'INDUBRASIL', 'WAGYU', 'SIMMENTAL', 'CRIOULO', 'JERSEY', 'HOLANDÊS', 'MURRAH', 'MESTIÇO', 'OUTROS') NOT NULL,
    `sexo` ENUM('MACHO', 'FEMEA', 'TODOS') NOT NULL,
    `composicao_racial` VARCHAR(255) NULL,
    `dataNascimento` DATE NULL,
    `numero_particular_proprietario` VARCHAR(255) NULL,
    `registro` VARCHAR(255) NULL,
    `status` ENUM('VIVO', 'FALECIDO', 'VENDIDO', 'DOADO', 'ROUBADO', 'DOENTE') NOT NULL DEFAULT 'VIVO',
    `peso` DOUBLE NULL,
    `localizacao` VARCHAR(255) NULL,
    `id_pai` BIGINT NULL,
    `id_mae` BIGINT NULL,
    `idFazenda` BIGINT NOT NULL,
    `idProprietario` BIGINT NOT NULL,

    UNIQUE INDEX `animal_numero_particular_proprietario_key`(`numero_particular_proprietario`),
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

-- CreateTable
CREATE TABLE `tipo_vacina` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `obrigatoria` TINYINT UNSIGNED NOT NULL,
    `generoAlvo` ENUM('MACHO', 'FEMEA', 'TODOS') NULL,
    `min_idade_meses` INTEGER NULL,
    `max_idade_meses` INTEGER NULL,
    `frequencia` ENUM('ANUAL', 'SEMESTRAL', 'BIMESTRAL', 'TRIMESTRAL', 'MENSAL', 'DOSE_UNICA', 'REFORCO') NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tipo_vacina_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacina_aplicada` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_animal` BIGINT NOT NULL,
    `id_tipo_vacina` BIGINT NOT NULL,
    `data_aplicacao` DATE NOT NULL,
    `proxima_dose` DATE NULL,
    `numero_dose` INTEGER NULL,
    `lote` VARCHAR(255) NULL,
    `veterinario` VARCHAR(255) NULL,
    `observacoes` VARCHAR(255) NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doenca` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(1000) NULL,
    `eh_cronica` BOOLEAN NOT NULL DEFAULT false,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doenca_nome_key`(`nome`),
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

-- AddForeignKey
ALTER TABLE `vacina_aplicada` ADD CONSTRAINT `vacina_aplicada_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vacina_aplicada` ADD CONSTRAINT `vacina_aplicada_id_tipo_vacina_fkey` FOREIGN KEY (`id_tipo_vacina`) REFERENCES `tipo_vacina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doenca_animal` ADD CONSTRAINT `doenca_animal_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doenca_animal` ADD CONSTRAINT `doenca_animal_id_doenca_fkey` FOREIGN KEY (`id_doenca`) REFERENCES `doenca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
