// src/modules/doencaAnimal/doencaAnimal.services.ts
import { injectable, inject } from "tsyringe";
import { DoencaAnimalRepository } from "./doencaAnimal.repository";

interface CreateDoencaAnimalDTO {
  idAnimal: string;
  idDoenca: string;
  dataDiagnostico: string; // ISO string
  emTratamento?: boolean;
  dataFimTratamento?: string | null; // ISO string
  observacoes?: string | null;
}

interface UpdateDoencaAnimalDTO {
  dataDiagnostico?: string;
  emTratamento?: boolean;
  dataFimTratamento?: string | null;
  observacoes?: string | null;
}

@injectable()
export class DoencaAnimalService {
  constructor(
    @inject(DoencaAnimalRepository)
    private doencaAnimalRepository: DoencaAnimalRepository
  ) {}

  async listarPorAnimal(idAnimal: string) {
    const idAnimalBigInt = BigInt(idAnimal);
    return this.doencaAnimalRepository.findByAnimal(idAnimalBigInt);
  }

  async buscarPorId(id: string) {
    const idBigInt = BigInt(id);
    const registro = await this.doencaAnimalRepository.findById(idBigInt);
    if (!registro) {
      throw new Error("Registro de doença do animal não encontrado.");
    }
    return registro;
  }

  async criar(data: CreateDoencaAnimalDTO) {
    const idAnimalBigInt = BigInt(data.idAnimal);
    const idDoencaBigInt = BigInt(data.idDoenca);

    const dataDiagnostico = new Date(data.dataDiagnostico);
    const dataFimTratamento = data.dataFimTratamento
      ? new Date(data.dataFimTratamento)
      : null;

    return this.doencaAnimalRepository.create({
      idAnimal: idAnimalBigInt,
      idDoenca: idDoencaBigInt,
      dataDiagnostico,
      emTratamento: data.emTratamento ?? true,
      dataFimTratamento,
      observacoes: data.observacoes ?? null,
    });
  }

  async atualizar(id: string, data: UpdateDoencaAnimalDTO) {
    const idBigInt = BigInt(id);

    // Garante que existe (pra permitir 404 no controller)
    await this.buscarPorId(id);

    const payload: {
      dataDiagnostico?: Date;
      emTratamento?: boolean;
      dataFimTratamento?: Date | null;
      observacoes?: string | null;
    } = {};

    if (data.dataDiagnostico) {
      payload.dataDiagnostico = new Date(data.dataDiagnostico);
    }
    if (typeof data.emTratamento === "boolean") {
      payload.emTratamento = data.emTratamento;
    }
    if (data.dataFimTratamento !== undefined) {
      payload.dataFimTratamento = data.dataFimTratamento
        ? new Date(data.dataFimTratamento)
        : null;
    }
    if (data.observacoes !== undefined) {
      payload.observacoes = data.observacoes;
    }

    return this.doencaAnimalRepository.update(idBigInt, payload);
  }

  async remover(id: string) {
    const idBigInt = BigInt(id);
    await this.buscarPorId(id);
    await this.doencaAnimalRepository.delete(idBigInt);
  }
}
