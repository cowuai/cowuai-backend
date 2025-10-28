import {Prisma, Usuario} from "@prisma/client"
import {usuarioRepository} from "./usuario.repository"
import {injectable} from "tsyringe";

@injectable()
export class UsuarioService {
    create = async (data: Omit<Usuario, "id" | "dataCadastro" | "dataAtualizacao">) => {
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
    }

    // READ
    findAll = async () => {
        return usuarioRepository.findAll()
    }

    findById = async (id: bigint) => {
        return usuarioRepository.findById(id);
    }

    findByNome = async (nome: string) => {
        return usuarioRepository.findByNome(nome);
    }

    findByCpf = async (cpf: string) => {
        return usuarioRepository.findByCpf(cpf);
    }

    findByEmail = async (email: string) => {
        return usuarioRepository.findByEmail(email);
    }

    update = async (id: bigint, data: Prisma.UsuarioUpdateInput) => {
    if (typeof data.cpf === "string") {
      const exist = await usuarioRepository.findByCpf(data.cpf);
      if (exist && exist.id !== id) throw new Error("Usuario com esse CPF já existe");
    }
    if (typeof data.email === "string") {
      const exist = await usuarioRepository.findByEmail(data.email);
      if (exist && exist.id !== id) throw new Error("Usuario com esse E-mail já existe");
    }
    if (typeof (data as any).dataNascimento !== "undefined") {
      const dn = (data as any).dataNascimento;
      if (!validaDataDeNascimento(dn)) throw new Error("dataNascimento inválida (futura ou formato inválido)");
      (data as any).dataNascimento = dn ? new Date(dn) : null;
    }
    return usuarioRepository.update(id, data);
  }

  delete = (id: bigint) => usuarioRepository.delete(id)
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



