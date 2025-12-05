/*
  Warnings:

  - A unique constraint covering the columns `[id_animal,id_doenca,data_diagnostico]` on the table `doenca_animal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_animal,id_tipo_vacina,data_aplicacao]` on the table `vacina_aplicada` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `doenca_animal_id_animal_id_doenca_data_diagnostico_key` ON `doenca_animal`(`id_animal`, `id_doenca`, `data_diagnostico`);

-- CreateIndex
CREATE UNIQUE INDEX `vacina_aplicada_id_animal_id_tipo_vacina_data_aplicacao_key` ON `vacina_aplicada`(`id_animal`, `id_tipo_vacina`, `data_aplicacao`);
