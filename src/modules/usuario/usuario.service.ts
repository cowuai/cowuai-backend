import { Usuario } from "@prisma/client"
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

        }
        
    }
}

// Valida data de nascimento (não pode ser no futuro)
function validaDataDeNascimento(data: string): boolean {
  // Tenta converter a string em uma data
  const dataNascimento = new Date(data);

  // Verifica se a data é válida
  if (isNaN(dataNascimento.getTime())) {
    return false; // formato inválido
  }

  // Pega a data de hoje (sem hora, para comparar apenas ano/mês/dia)
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Retorna true se a data de nascimento não for futura
  return dataNascimento <= hoje;
}
