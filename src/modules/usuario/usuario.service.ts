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
  

  update: async (id: bigint, data: any) => {
    // (opcional) checar unicidade se cpf/email vierem no update
    if (typeof data.cpf === "string") {
      const exist = await usuarioRepository.findByCpf(data.cpf);
      if (exist && exist.id !== id) {
        throw new Error("Usuario com esse CPF já existe");
      }
    }
    if (typeof data.email === "string") {
      const exist = await usuarioRepository.findByEmail(data.email);
      if (exist && exist.id !== id) {
        throw new Error("Usuario com esse E-mail já existe");
      }
    }

    // montar payload no formato do Prisma
    const payload: Prisma.UsuarioUpdateInput = {};
    if (typeof data.cpf !== "undefined") payload.cpf = data.cpf;
    if (typeof data.nome !== "undefined") payload.nome = data.nome;
    if (typeof data.email !== "undefined") payload.email = data.email;
    if (typeof data.senha !== "undefined") payload.senha = data.senha; // já vem hasheada do controller
    if (typeof data.ativo !== "undefined") payload.ativo = data.ativo;

    if (typeof data.dataNascimento !== "undefined") {
      payload.dataNascimento = data.dataNascimento
        ? new Date(data.dataNascimento)
        : null;
    }

    return usuarioRepository.update(id, payload);
  },

  delete: async (id: bigint) => {
    await usuarioRepository.delete(id);
  },
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




