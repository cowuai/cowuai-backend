import zod from 'zod';

export const createUsuarioSchema = zod.object({
    cpf: zod
        .string()
        .regex(/^\d{11}$/, "CPF deve conter exatamente 11 números")
        .refine((v) => {
            // validação simples copiada do controller (não muito eficiente, mas consistente)
            const cpf = v.replace(/\D/g, "");
            if (cpf.length !== 11) return false;
            if (/^(\d)\1{10}$/.test(cpf)) return false;

            let soma = 0;
            for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
            let d1 = 11 - (soma % 11);
            if (d1 >= 10) d1 = 0;
            if (d1 !== parseInt(cpf[9])) return false;

            soma = 0;
            for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
            let d2 = 11 - (soma % 11);
            if (d2 >= 10) d2 = 0;
            return d2 === parseInt(cpf[10]);
        }, "CPF inválido"),

    nome: zod
        .string()
        .min(4, "Nome muito curto")
        .max(255, "Nome muito longo")
        .refine((v) => v.trim().split(" ").length >= 2, {
            message: "Digite nome completo (nome e sobrenome)",
        })
        .refine((v) => v.trim().split(" ").every((p) => p.length >= 2), {
            message: "Cada parte do nome deve ter ao menos 2 caracteres",
        }),

    email: zod.string().email("Email inválido"),

    senha: zod
        .string()
        .min(8, "Senha deve ter ao menos 8 caracteres")
        .regex(/[A-Z]/, "Senha deve ter ao menos 1 letra maiúscula")
        .regex(/[a-z]/, "Senha deve ter ao menos 1 letra minúscula")
        .regex(/[0-9]/, "Senha deve ter ao menos 1 número")
        .regex(/[\W_]/, "Senha deve ter ao menos 1 caractere especial"),

    dataNascimento: zod
        .string()
        .optional()
        .refine((s) => !s || !Number.isNaN(Date.parse(s)), "Data de nascimento inválida")
        .refine((s) => {
            if (!s) return true;
            const birth = new Date(s);
            const today = new Date();
            const birthDateOnly = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
            const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return birthDateOnly <= todayDateOnly;
        }, "Data de nascimento não pode ser no futuro"),

    ativo: zod.boolean().optional(),

    telefone: zod
        .union([
            zod.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
            zod.literal("")
        ])
        .optional(),

    localizacao: zod
        .union([
            zod.string().max(255).regex(/^[\p{L}\p{N}\s,.-]*$/u, "Localização contém caracteres inválidos"),
            zod.literal("")
        ])
        .optional(),

    urlImagem: zod
        .union([
            zod.string().url("URL inválida").max(2048),
            zod.literal("")
        ])
        .optional(),
});

export const updateUsuarioSchema = createUsuarioSchema.partial();

export const idParamSchema = zod.object({
    id: zod.string().regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
});

export const nomeParamSchema = zod.object({ nome: zod.string().min(1, "Nome é obrigatório") });
export const cpfParamSchema = zod.object({ cpf: zod.string().regex(/^\d{11}$/, "CPF inválido") });
export const emailParamSchema = zod.object({ email: zod.string().email("Email inválido") });
