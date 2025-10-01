import { animalRepository } from "./animal.repository";
import { Animal } from "@prisma/client";
import { injectable } from "tsyringe";

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
            throw new Error("Já existe um animal com esse número particular para este proprietário");
        }

        return animalRepository.create(data);
    }

    findAll = () => {
        return animalRepository.findAll();
    }

    findById = async (id: bigint) => {
        const animal = await animalRepository.findById(id);
        if (!animal) {
            throw new Error("Animal não encontrado");
        }
        return animal;
    }

    findByProprietario = async (idProprietario: bigint) => {
        const animals = await animalRepository.findByProprietario(idProprietario);
        if (!animals || animals.length === 0) {
            throw new Error("Nenhum animal encontrado para este proprietário");
        }
        return animals;
    }

    findByFazenda = async (idFazenda: bigint) => {
        const animals = await animalRepository.findByFazenda(idFazenda);
        if (!animals || animals.length === 0) {
            throw new Error("Nenhum animal encontrado para esta fazenda");
        }
        return animals;
    }

     update = async (id: bigint, data: Partial<Animal>) => {
        const existingAnimal = await animalRepository.findById(id);
        if (!existingAnimal) {
            throw new Error("Animal não encontrado");
        }

        if (
            data.numeroParticularProprietario &&
            data.numeroParticularProprietario !== existingAnimal.numeroParticularProprietario &&
            existingAnimal.idProprietario // garante que não é null
        ) {
            const duplicateAnimal = await animalRepository.findByNumeroParticularAndProprietario(
                data.numeroParticularProprietario,
                existingAnimal.idProprietario
            );

            if (duplicateAnimal) {
                throw new Error("Outro animal com esse número particular já existe para este proprietário");
            }
        }

        return animalRepository.update(id, data);
    }

    delete = async (id: bigint) => {
        const existingAnimal = await animalRepository.findById(id);
        if (!existingAnimal) {
            throw new Error("Animal não encontrado");
        }
        return animalRepository.delete(id);
    }
}
