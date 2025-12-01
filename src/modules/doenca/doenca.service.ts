// src/modules/doenca/doenca.service.ts
import { injectable, inject } from "tsyringe";
import { DoencaRepository } from "./doenca.repository";

interface CreateDoencaDTO {
  nome: string;
  descricao?: string | null;
  ehCronica?: boolean;
}

interface UpdateDoencaDTO {
  nome?: string;
  descricao?: string | null;
  ehCronica?: boolean;
}

@injectable()
export class DoencaService {
  constructor(
    @inject(DoencaRepository) private doencaRepository: DoencaRepository
  ) {}

  async findAll() {
    return this.doencaRepository.findAll();
  }

  async findById(id: bigint) {
    const doenca = await this.doencaRepository.findById(id);
    if (!doenca) {
      throw new Error("Doença não encontrada.");
    }
    return doenca;
  }

  async create(data: CreateDoencaDTO) {
    return this.doencaRepository.create({
      nome: data.nome,
      descricao: data.descricao ?? null,
      ehCronica: data.ehCronica ?? false,
    });
  }

  async update(id: bigint, data: UpdateDoencaDTO) {
    // Garante que existe antes de atualizar (pra poder devolver 404 no controller)
    await this.findById(id);

    return this.doencaRepository.update(id, {
      nome: data.nome,
      descricao: data.descricao ?? null,
      ehCronica: data.ehCronica,
    });
  }

  async delete(id: bigint) {
    // Garante que existe antes de deletar (pra poder devolver 404 no controller)
    await this.findById(id);
    await this.doencaRepository.delete(id);
  }
}
