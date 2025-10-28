-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: cowuai
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `RefreshToken`
--

DROP TABLE IF EXISTS `RefreshToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RefreshToken` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idUsuario` bigint NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dispositivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefreshToken_token_key` (`token`),
  UNIQUE KEY `RefreshToken_idUsuario_dispositivo_key` (`idUsuario`,`dispositivo`),
  CONSTRAINT `RefreshToken_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshToken`
--

LOCK TABLES `RefreshToken` WRITE;
/*!40000 ALTER TABLE `RefreshToken` DISABLE KEYS */;
INSERT INTO `RefreshToken` VALUES ('7868e0c9-0fb4-41f5-ba95-4490830e139d',1,'06e46a54-4aee-4fbf-8ce2-5dbf85071d67','Linux','2025-11-04 05:43:19.178','2025-10-28 05:43:19.179','2025-10-28 05:43:19.179');
/*!40000 ALTER TABLE `RefreshToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('55b61dc1-c20f-44c8-bf4e-bb4c09913835','200e6451c3079be4b3149210a4225898e1a86f536302425e301eeea4ef8ea737','2025-10-25 18:04:33.954','20251025175852_migration_pra_seed',NULL,NULL,'2025-10-25 18:04:33.818',1),('83ab1dc4-cb6f-4c74-b5b8-0bbea3ff03d6','1b7f333e38ae9c6f76a42e960115591ebd7a346c3d36f76f0e48c59e5ba740a1','2025-10-25 18:04:33.817','20251007220530_new_migration',NULL,NULL,'2025-10-25 18:04:33.397',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipoRaca` enum('NELORE','GIR','GIROLANDO','BRAHMAN','GUREZÁ','SINDI','ANGUS','BRANGUS','LIMOUSIN','CHIANINA','DEVON','BELGIAN BLUE','HEREFORD','CANCHIM','TABAPUÃ','CARACU','SENEPOL','CHAROLÊS','INDUBRASIL','WAGYU','SIMMENTAL','CRIOULO','JERSEY','HOLANDÊS','MURRAH','MESTIÇO','OUTROS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexo` enum('MACHO','FEMEA','TODOS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataNascimento` date DEFAULT NULL,
  `registro` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('VIVO','FALECIDO','VENDIDO','DOADO','ROUBADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VIVO',
  `peso` double DEFAULT NULL,
  `id_pai` bigint DEFAULT NULL,
  `id_mae` bigint DEFAULT NULL,
  `idFazenda` bigint NOT NULL,
  `idProprietario` bigint DEFAULT NULL,
  `composicao_racial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localizacao` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_particular_proprietario` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `animal_numero_particular_proprietario_key` (`numero_particular_proprietario`),
  KEY `animal_id_pai_fkey` (`id_pai`),
  KEY `animal_id_mae_fkey` (`id_mae`),
  KEY `animal_idFazenda_fkey` (`idFazenda`),
  CONSTRAINT `animal_id_mae_fkey` FOREIGN KEY (`id_mae`) REFERENCES `animal` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `animal_id_pai_fkey` FOREIGN KEY (`id_pai`) REFERENCES `animal` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `animal_idFazenda_fkey` FOREIGN KEY (`idFazenda`) REFERENCES `fazenda` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (1,'Animal Teste 1','GIR','MACHO','2020-01-01',NULL,'VIVO',NULL,NULL,NULL,1,1,NULL,'Baias 3','ANIMAL001'),(2,'Animal Teste 2','HOLANDÊS','FEMEA','2021-06-15',NULL,'VIVO',NULL,NULL,NULL,1,1,NULL,'Baias 5','ANIMAL002'),(3,'Animal Teste 3','GIROLANDO','FEMEA','2019-11-20',NULL,'VIVO',NULL,1,2,1,1,NULL,'Pastagem A','ANIMAL003');
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fazenda`
--

DROP TABLE IF EXISTS `fazenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fazenda` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_proprietario` bigint NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cidade` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pais` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `porte` enum('PEQUENO','MÉDIO','GRANDE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `afixo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prefixo` tinyint unsigned NOT NULL,
  `sufixo` tinyint unsigned NOT NULL,
  `data_cadastro` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `data_atualizacao` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fazenda_afixo_key` (`afixo`),
  KEY `fazenda_id_proprietario_fkey` (`id_proprietario`),
  CONSTRAINT `fazenda_id_proprietario_fkey` FOREIGN KEY (`id_proprietario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fazenda`
--

LOCK TABLES `fazenda` WRITE;
/*!40000 ALTER TABLE `fazenda` DISABLE KEYS */;
INSERT INTO `fazenda` VALUES (1,1,'Fazenda de Teste','Rua de Teste, 123','Cidade Teste','Estado Teste','País Teste','MÉDIO','FAZENDA_TESTE',0,1,'2025-10-25 18:04:36.626','2025-10-25 18:04:36.626');
/*!40000 ALTER TABLE `fazenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_vacina`
--

DROP TABLE IF EXISTS `tipo_vacina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_vacina` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `obrigatoria` tinyint unsigned NOT NULL,
  `generoAlvo` enum('MACHO','FEMEA','TODOS') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `min_idade_meses` int DEFAULT NULL,
  `max_idade_meses` int DEFAULT NULL,
  `frequencia` enum('ANUAL','SEMESTRAL','BIMESTRAL','TRIMESTRAL','MENSAL','DOSE_UNICA','REFORCO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_cadastro` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `data_atualizacao` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo_vacina_nome_key` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vacina`
--

LOCK TABLES `tipo_vacina` WRITE;
/*!40000 ALTER TABLE `tipo_vacina` DISABLE KEYS */;
INSERT INTO `tipo_vacina` VALUES (1,'Febre Aftosa','Vacina obrigatória aplicada em duas etapas anuais, conforme calendário do MAPA.',1,'TODOS',0,NULL,'SEMESTRAL','2025-10-25 18:04:36.573','2025-10-25 18:05:22.658'),(2,'Brucelose','Aplicada em fêmeas de 3 a 8 meses, sob supervisão de médico veterinário.',1,'FEMEA',3,8,'DOSE_UNICA','2025-10-25 18:04:36.582','2025-10-25 18:05:22.669'),(3,'Raiva','Vacina obrigatória em regiões com foco, aplicada anualmente em todo o rebanho.',1,'TODOS',0,NULL,'ANUAL','2025-10-25 18:04:36.589','2025-10-25 18:05:22.673'),(4,'Leptospirose','Primeira dose entre 4 e 6 meses de idade, reforço após 4 semanas e revacinação semestral.',0,'TODOS',4,NULL,'SEMESTRAL','2025-10-25 18:04:36.594','2025-10-25 18:05:22.677'),(5,'Clostridioses','Recomenda-se em todos os animais; primeira dose aos 2 meses e reforço após 30 dias.',1,'TODOS',2,NULL,'ANUAL','2025-10-25 18:04:36.598','2025-10-25 18:05:22.680'),(6,'Botulismo','Duas doses iniciais com 4 a 6 semanas de intervalo e reforço anual.',0,'TODOS',2,NULL,'ANUAL','2025-10-25 18:04:36.602','2025-10-25 18:05:22.684'),(7,'IBR (Rinotraqueíte Infecciosa Bovina)','Vacinação recomendada aos 3 meses de idade, com reforço após 4 semanas e dose anual.',0,'TODOS',3,NULL,'ANUAL','2025-10-25 18:04:36.606','2025-10-25 18:05:22.688'),(8,'BVD (Diarreia Viral Bovina)','Recomenda-se vacinação a partir dos 3 meses com reforço e revacinação anual.',0,'TODOS',3,NULL,'ANUAL','2025-10-25 18:04:36.609','2025-10-25 18:05:22.692'),(9,'Mastite','Vacinação recomendada em vacas leiteiras, conforme orientação veterinária.',0,'FEMEA',NULL,NULL,'ANUAL','2025-10-25 18:04:36.612','2025-10-25 18:05:22.697'),(10,'Campilobacteriose','Recomendada para animais em reprodução; aplicar um mês antes da estação de monta.',0,'TODOS',12,NULL,'ANUAL','2025-10-25 18:04:36.615','2025-10-25 18:05:22.703'),(11,'Colibacilose','Vacinação recomendada em bezerros para prevenção de diarreias neonatais.',0,'TODOS',1,3,'DOSE_UNICA','2025-10-25 18:04:36.618','2025-10-25 18:05:22.707');
/*!40000 ALTER TABLE `tipo_vacina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cpf` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_cpf_key` (`cpf`),
  UNIQUE KEY `usuario_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'12345678900','Usuário de Teste','teste@email.com','$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq','1990-01-01',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacina_aplicada`
--

DROP TABLE IF EXISTS `vacina_aplicada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacina_aplicada` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_animal` bigint NOT NULL,
  `id_tipo_vacina` bigint NOT NULL,
  `data_aplicacao` date NOT NULL,
  `proxima_dose` date DEFAULT NULL,
  `numero_dose` int DEFAULT NULL,
  `lote` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `veterinario` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacoes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_cadastro` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `data_atualizacao` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vacina_aplicada_id_animal_fkey` (`id_animal`),
  KEY `vacina_aplicada_id_tipo_vacina_fkey` (`id_tipo_vacina`),
  CONSTRAINT `vacina_aplicada_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `vacina_aplicada_id_tipo_vacina_fkey` FOREIGN KEY (`id_tipo_vacina`) REFERENCES `tipo_vacina` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacina_aplicada`
--

LOCK TABLES `vacina_aplicada` WRITE;
/*!40000 ALTER TABLE `vacina_aplicada` DISABLE KEYS */;
INSERT INTO `vacina_aplicada` VALUES (1,1,1,'2023-01-10','2023-07-10',1,'L001','Dr. Veterinário A','Nenhuma observação.','2025-10-25 18:04:36.644','2025-10-25 18:04:36.644'),(2,2,2,'2023-02-15',NULL,1,'L002','Dra. Veterinária B','Aplicada sem complicações.','2025-10-25 18:04:36.648','2025-10-25 18:04:36.648'),(3,3,3,'2023-03-20','2024-03-20',1,'L003','Dr. Veterinário C','Reação leve no local da aplicação.','2025-10-25 18:04:36.651','2025-10-25 18:04:36.651'),(4,1,1,'2023-01-10','2023-07-10',1,'L001','Dr. Veterinário A','Nenhuma observação.','2025-10-25 18:05:22.717','2025-10-25 18:05:22.717'),(5,2,2,'2023-02-15',NULL,1,'L002','Dra. Veterinária B','Aplicada sem complicações.','2025-10-25 18:05:22.720','2025-10-25 18:05:22.720'),(6,3,3,'2023-03-20','2024-03-20',1,'L003','Dr. Veterinário C','Reação leve no local da aplicação.','2025-10-25 18:05:22.724','2025-10-25 18:05:22.724'),(13,3,4,'2025-10-25','2026-04-25',1,'Teste1','Teste1','Teste1','2025-10-25 23:21:57.055','2025-10-25 23:21:57.055'),(14,3,4,'2026-04-25','2026-10-25',2,'Teste1','Teste1','Teste1','2025-10-25 23:22:57.663','2025-10-25 23:22:57.663'),(15,1,3,'2025-10-30','2026-10-30',1,'Teste1','Teste1','Teste1','2025-10-25 23:29:46.029','2025-10-25 23:29:46.029'),(16,3,4,'2025-10-28','2026-04-28',3,'01','Teste3','Teste3','2025-10-28 04:15:37.499','2025-10-28 04:15:37.499'),(17,3,3,'2025-10-28','2026-10-28',2,'teste4','teste4','teste4','2025-10-28 05:44:05.511','2025-10-28 05:44:05.511');
/*!40000 ALTER TABLE `vacina_aplicada` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-28 14:22:48
