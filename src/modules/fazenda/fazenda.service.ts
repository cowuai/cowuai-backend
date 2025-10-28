import {fazendaRepository} from "./fazenda.repository";
import {Fazenda} from "@prisma/client";
import {injectable} from "tsyringe";

@injectable()
export class FazendaService {
    create = async (data: Omit<Fazenda, "id" | "dataCadastro" | "dataAtualizacao">) => {
        const existingFazenda = await fazendaRepository.findByNomeAndIdProprietario(data.nome, data.idProprietario);
        if (existingFazenda) {
            throw new Error("Fazenda com esse nome já existe para este proprietário");
        }
        return fazendaRepository.create(data);
    }

    findAll = () => {
        return fazendaRepository.findAll();
    }

    findById = async (id: bigint) => {
        const fazenda = await fazendaRepository.findById(id);
        if (!fazenda) {
            throw new Error("Fazenda não encontrada");
        }
        return fazenda;
    }

    findByNome = async (nome: string) => {
        const fazenda = await fazendaRepository.findByNome(nome);
        if (!fazenda) {
            throw new Error("Fazenda não encontrada");
        }
        return fazenda;
    }

    findByIdProprietario = async (idProprietario: bigint) => {
        const fazendas = await fazendaRepository.findByIdProprietario(idProprietario);
        if (!fazendas || fazendas.length === 0) {
            throw new Error("Nenhuma fazenda encontrada para este proprietário");
        }
        return fazendas;
    }

    update = async (id: bigint, data: Partial<Fazenda>) => {
        const existingFazenda = await fazendaRepository.findById(id);
        if (!existingFazenda) {
            throw new Error("Fazenda não encontrada");
        }
        if (data.nome && data.nome !== existingFazenda.nome) {
            const fazendaWithSameName = await fazendaRepository.findByNomeAndIdProprietario(data.nome, existingFazenda.idProprietario);
            if (fazendaWithSameName) {
                throw new Error("Outra fazenda com esse nome já existe para este proprietário");
            }
        }
        return fazendaRepository.update(id, data);
    }

    delete = async (id: bigint) => {
        const existingFazenda = await fazendaRepository.findById(id);
        if (!existingFazenda) {
            throw new Error("Fazenda não encontrada");
        }
        return fazendaRepository.delete(id);
    }

    countFarmsByUserId = async (userId: bigint) => {
        return fazendaRepository.countFarmsByUserId(userId);
    }
}