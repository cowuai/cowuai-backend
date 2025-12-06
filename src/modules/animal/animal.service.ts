import {animalRepository} from "./animal.repository";
import {Animal} from "@prisma/client";
import {injectable} from "tsyringe";
import {ApiError} from "../../types/ApiError";
import {fazendaRepository} from "../fazenda/fazenda.repository";

interface PaginatedAnimalsResult {
    animals: Animal[];
    total: number;
}

@injectable()
export class AnimalService {
    create = async (data: Omit<Animal, "id" | "dataCadastro" | "dataAtualizacao">) => {
        // Verifica se os campos obrigatórios para busca existem
        const numeroParticular = data.numeroParticularProprietario ?? "";
        const idProprietario = data.idProprietario ?? 0n;

        const existingAnimal = await animalRepository.findByNumeroParticularAndProprietario(
            numeroParticular,
            idProprietario
        );

        if (existingAnimal) {
            throw new ApiError(409, "Já existe um animal com esse número particular para este proprietário");
        }

        // Buscar informações da fazenda para concatenar o afixo com o nome do animal
        if (data.idFazenda) {
            const fazenda = await fazendaRepository.findById(data.idFazenda);
            if (fazenda && fazenda.afixo) {
                // Se prefixo = true, concatena como: AFIXO - NOME
                // Se sufixo = true (prefixo = false), concatena como: NOME - AFIXO
                if (fazenda.prefixo) {
                    data.nome = `${fazenda.afixo} - ${data.nome}`;
                } else if (fazenda.sufixo) {
                    data.nome = `${data.nome} - ${fazenda.afixo}`;
                }
            }
        }

        return animalRepository.create(data);
    };

    findAllPaginated = async (
        page: number,
        pageSize: number
    ): Promise<PaginatedAnimalsResult> => {
        const skip = (page - 1) * pageSize;

        // Chama os novos métodos do repositório
        const animalsPromise = animalRepository.findManyPaginated(skip, pageSize);
        const totalPromise = animalRepository.countAll();

        // Executa as duas consultas em paralelo
        const [animals, total] = await Promise.all([animalsPromise, totalPromise]);

        return {animals, total};
    };

    findById = async (id: bigint) => {
        const animal = await animalRepository.findById(id);
        if (!animal) {
            throw new ApiError(404, "Animal não encontrado");
        }
        return animal;
    };

    findByProprietario = async (idProprietario: bigint) => {
        const animals = await animalRepository.findByProprietario(idProprietario);

        if (animals.length === 0) {
            throw new ApiError(404, "Nenhum animal encontrado para este proprietário");
        }

        return animals;
    };

    findByProprietarioPaginated = async (
        idProprietario: bigint,
        page: number,
        pageSize: number
    ): Promise<PaginatedAnimalsResult> => {
        const skip = (page - 1) * pageSize;

        const animalsPromise = animalRepository.findByProprietarioPaginated(
            idProprietario,
            skip,
            pageSize
        );
        const totalPromise = animalRepository.countByProprietario(idProprietario);

        const [animals, total] = await Promise.all([animalsPromise, totalPromise]);

        if (!total || total === 0) {
            throw new ApiError(404, "Nenhum animal encontrado para este proprietário");
        }

        return {animals, total};
    };

    findByFazenda = async (idFazenda: bigint) => {
        const animals = await animalRepository.findByFazenda(idFazenda);
        if (!animals || animals.length === 0) {
            throw new ApiError(404, "Nenhum animal encontrado para esta fazenda");
        }
        return animals;
    };

    update = async (id: bigint, data: Partial<Animal>) => {
        const existingAnimal = await animalRepository.findById(id);
        if (!existingAnimal) {
            throw new ApiError(404, "Animal não encontrado");
        }

        if (
            data.numeroParticularProprietario &&
            data.numeroParticularProprietario !==
            existingAnimal.numeroParticularProprietario &&
            existingAnimal.idProprietario // garante que não é null
        ) {
            const duplicateAnimal =
                await animalRepository.findByNumeroParticularAndProprietario(
                    data.numeroParticularProprietario,
                    existingAnimal.idProprietario
                );

            if (duplicateAnimal) {
                throw new ApiError(409,
                    "Outro animal com esse número particular já existe para este proprietário"
                );
            }
        }

        return animalRepository.update(id, data);
    };

    delete = async (id: bigint) => {
        const existingAnimal = await animalRepository.findById(id);
        if (!existingAnimal) {
            throw new ApiError(404, "Animal não encontrado");
        }
        return animalRepository.delete(id);
    };

    async findByIdWithRelations(bigint: bigint, relation: string) {
        const animalWithRelations = await animalRepository.findByIdWithRelations(bigint, relation);
        if (!animalWithRelations) {
            throw new ApiError(404, "Animal não encontrado");
        }
        return animalWithRelations;
    }

    countAnimalsByUserId = async (userId: bigint) => {
        return animalRepository.countAnimalsByUserId(userId);
    }
}
