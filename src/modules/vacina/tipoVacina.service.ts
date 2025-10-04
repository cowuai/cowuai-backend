import { injectable } from "tsyringe";
import { tipoVacinaRepository } from "./tipoVacina.repository";
import { TipoVacina } from "@prisma/client";

@injectable()
export class TipoVacinaService {
    create = async (data: Omit<TipoVacina, "id" | "dataCadastro" | "dataAtualizacao">) => {
        const existingTipoVacina = await tipoVacinaRepository.findByNome(data.nome);
        if (existingTipoVacina) {
            throw new Error("Tipo de vacina com esse nome já existe");
        }
        return tipoVacinaRepository.create(data);
    }

    findAll = () => {
        return tipoVacinaRepository.findAll();
    }

    findById = async (id: bigint) => {
        const tipoVacina = await tipoVacinaRepository.findById(id);
        if (!tipoVacina) {
            throw new Error("Tipo de vacina não encontrado");
        }
        return tipoVacina;
    }

    findByNome = async (nome: string) => {
        const tipoVacina = await tipoVacinaRepository.findByNome(nome);
        if (!tipoVacina) {
            throw new Error("Tipo de vacina não encontrado");
        }
        return tipoVacina;
    }

    update = async (id: bigint, data: Partial<TipoVacina>) => {
        const existingTipoVacina = await tipoVacinaRepository.findById(id);
        if (!existingTipoVacina) {
            throw new Error("Tipo de vacina não encontrado");
        }
        if (data.nome && data.nome !== existingTipoVacina.nome) {
            const tipoVacinaWithSameName = await tipoVacinaRepository.findByNome(data.nome);
            if (tipoVacinaWithSameName) {
                throw new Error("Outro tipo de vacina com esse nome já existe");
            }
        }
        return tipoVacinaRepository.update(id, data);
    }

    delete = async (id: bigint) => {
        const existingTipoVacina = await tipoVacinaRepository.findById(id);
        if (!existingTipoVacina) {
            throw new Error("Tipo de vacina não encontrado");
        }
        return tipoVacinaRepository.delete(id);
    }
}