import {Prisma, Usuario} from "@prisma/client"
import {usuarioRepository} from "./usuario.repository"
import {injectable} from "tsyringe";
import {ApiError} from "../../types/ApiError";

@injectable()
export class UsuarioService {
    create = async (data: Prisma.UsuarioCreateInput) => {
        // Se for registro via Google, CPF pode ser opcional; email continua obrigatório
        if (!data.googleId) {
            if (!data.cpf || !data.email) {
                throw new ApiError(406, "CPF e E-mail são obrigatórios");
            }
        } else {
            if (!data.email) {
                throw new ApiError(406, "E-mail é obrigatório para autenticação Google");
            }
        }

        if (data.cpf) {
            const existingCpf = await usuarioRepository.findByCpf(data.cpf)
            if (existingCpf) {
                throw new ApiError(409, "Usuario com esse CPF já existe");
            }
        }

        if (data.email) {
            const existingEmail = await usuarioRepository.findByEmail(data.email)
            if (existingEmail) {
                throw new ApiError(409, "Usuario com esse E-mail já existe");
            }
        }

        if (!data.googleId && !validaDataDeNascimento(data.dataNascimento)) {
            throw new ApiError(406, "Data de nascimento inválida (futura ou formato inválido)");
        }

        // Cria e retorna o novo usuário
        return usuarioRepository.create(data);
    }

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

    findByGoogleId = async (googleId: string) => {
        return usuarioRepository.findByGoogleId(googleId);
    }

    update = async (id: bigint, data: Prisma.UsuarioUpdateInput) => {
        if (typeof data.cpf === "string") {
            const exist = await usuarioRepository.findByCpf(data.cpf);
            if (exist && exist.id !== id) throw new ApiError(409,"Usuario com esse CPF já existe");
        }
        if (typeof data.email === "string") {
            const exist = await usuarioRepository.findByEmail(data.email);
            if (exist && exist.id !== id) throw new ApiError(409,"Usuario com esse E-mail já existe");
        }
        if (typeof (data as any).dataNascimento !== "undefined") {
            const dn = (data as any).dataNascimento;
            if (!validaDataDeNascimento(dn)) throw new ApiError(406,"Data de nascimento inválida (futura ou formato inválido)");
            (data as any).dataNascimento = dn ? new Date(dn) : null;
        }
        return usuarioRepository.update(id, data);
    }

    delete = (id: bigint) => usuarioRepository.delete(id)

    findByResetToken = async (token: string) => {
        return usuarioRepository.findByResetToken(token);
    }
}

// Valida data de nascimento (não pode ser no futuro)
function validaDataDeNascimento(data: string | Date | null | undefined): boolean {
    if (data == null) return true;

    const d = typeof data === 'string' ? new Date(data) : data;
    if (isNaN(d.getTime())) return false;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return d <= hoje;
}
