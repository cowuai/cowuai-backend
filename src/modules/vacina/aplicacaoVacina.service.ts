import {aplicacaoVacinaRepository} from "./aplicacaoVacina.repository";
import {Animal, FrequenciaVacina, TipoVacina, VacinaAplicada} from "@prisma/client";
import {injectable} from "tsyringe";
import {animalRepository} from "../animal/animal.repository";
import {tipoVacinaRepository} from "./tipoVacina.repository";

@injectable()
export class AplicacaoVacinaService {
    create = async (data: Omit<VacinaAplicada, "id" | "dataCadastro" | "dataAtualizacao">) => {
        const animal = await animalRepository.findById(data.idAnimal);
        if (!animal) {
            throw new Error("Animal não encontrado");
        }
        const tipoVacina = await tipoVacinaRepository.findById(data.idTipoVacina);
        if (!tipoVacina) {
            throw new Error("Tipo de vacina não encontrado");
        }
        await this.validate(tipoVacina, animal, data.dataAplicacao);
        return aplicacaoVacinaRepository.create(data);
    }

    validate = async (tipoVacina: TipoVacina, animal: Animal, dataAplicacao: Date) => {
        const ageMonths = animal.dataNascimento
            ? (Date.now() - animal.dataNascimento.getTime()) / (1000 * 60 * 60 * 24 * 30)
            : null;

        if (tipoVacina.generoAlvo && tipoVacina.generoAlvo !== animal.sexo) {
            throw new Error(`Vacina ${tipoVacina.nome} não pode ser aplicada em animais do gênero ${animal.sexo}`);
        }

        if (tipoVacina.minIdadeMeses && (ageMonths === null || ageMonths < tipoVacina.minIdadeMeses)) {
            throw new Error(`Vacina ${tipoVacina.nome} requer idade mínima de ${tipoVacina.minIdadeMeses} meses`);
        }

        if (tipoVacina.maxIdadeMeses && (ageMonths === null || ageMonths > tipoVacina.maxIdadeMeses)) {
            throw new Error(`Vacina ${tipoVacina.nome} requer idade máxima de ${tipoVacina.maxIdadeMeses} meses`);
        }

        if (tipoVacina.frequencia == FrequenciaVacina.ANUAL) {
            const lastApplication = await aplicacaoVacinaRepository.findByIdAnimal(animal.id)
                .then(apps => apps
                    .filter(app => app.idTipoVacina === tipoVacina.id)
                    .sort((a, b) => b.dataAplicacao.getTime() - a.dataAplicacao.getTime())[0]);

            if (lastApplication) {
                const nextDueDate = new Date(lastApplication.dataAplicacao);
                nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
                if (dataAplicacao < nextDueDate) {
                    throw new Error(`Vacina ${tipoVacina.nome} já foi aplicada em ${lastApplication.dataAplicacao.toLocaleDateString()}. Próxima aplicação só pode ser feita após ${nextDueDate.toLocaleDateString()}`);
                }
            }
        }
    }

    findAll = () => {
        return aplicacaoVacinaRepository.findAll();
    }

    findById = async (id: bigint) => {
        const aplicacao = await aplicacaoVacinaRepository.findById(id);
        if (!aplicacao) {
            throw new Error("Aplicação de vacina não encontrada");
        }
        return aplicacao;
    }

    findByIdAnimal = async (idAnimal: bigint) => {
        const aplicacoes = await aplicacaoVacinaRepository.findByIdAnimal(idAnimal);
        if (!aplicacoes || aplicacoes.length === 0) {
            throw new Error("Nenhuma aplicação de vacina encontrada para este animal");
        }
        return aplicacoes;
    }

    update = async (id: bigint, data: Partial<VacinaAplicada>) => {
        const existingAplicacao = await aplicacaoVacinaRepository.findById(id);
        if (!existingAplicacao) {
            throw new Error("Aplicação de vacina não encontrada");
        }
        if (data.idAnimal && data.idAnimal !== existingAplicacao.idAnimal) {
            const animal = await animalRepository.findById(data.idAnimal);
            if (!animal) {
                throw new Error("Animal não encontrado");
            }
        }
        if (data.idTipoVacina && data.idTipoVacina !== existingAplicacao.idTipoVacina) {
            const tipoVacina = await tipoVacinaRepository.findById(data.idTipoVacina);
            if (!tipoVacina) {
                throw new Error("Tipo de vacina não encontrado");
            }
        }
        return aplicacaoVacinaRepository.update(id, data);
    }

    delete = async (id: bigint) => {
        const existingAplicacao = await aplicacaoVacinaRepository.findById(id);
        if (!existingAplicacao) {
            throw new Error("Aplicação de vacina não encontrada");
        }
        return aplicacaoVacinaRepository.delete(id);
    }
}