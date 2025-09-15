import { Prisma,Usuario } from "@prisma/client"
import { usuarioRepository } from "./usuario.repository"

export const usuarioService = {
  create: async (data: Omit<Usuario, "id">) => {
    const existingCpf = await usuarioRepository.findByCpf(data.cpf)
    if (existingCpf) {
      throw new Error("Usuario com esse CPF já existe");
    }
    const existingEmail = await usuarioRepository.findByEmail(data.email)
    if (existingEmail) {
      throw new Error("Usuario com esse E-mail já existe");
    }
    const dataNascimento = data.dataNascimento
    if (!validaDataDeNascimento(data.dataNascimento)) {
      throw new Error("dataNascimento inválida (futura ou formato inválido)");
    }
    // cria e retorna o novo usuário
    return usuarioRepository.create(data);
  },

    // READ
  findAll: () => usuarioRepository.findAll(),
  findById: (id: bigint) => usuarioRepository.findById(id),
  findByNome: (nome: string) => usuarioRepository.findByNome(nome),
  findByCpf: (cpf: string) => usuarioRepository.findByCpf(cpf),
  findByEmail: (email: string) => usuarioRepository.findByEmail(email),
  
}

// Valida data de nascimento (não pode ser no futuro)
// Aceita string | Date | null | undefined
function validaDataDeNascimento(data: string | Date | null | undefined): boolean {
  if (data == null) return true; // ok se for opcional

  const d = typeof data === 'string' ? new Date(data) : data;
  if (isNaN(d.getTime())) return false;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return d <= hoje;
}



