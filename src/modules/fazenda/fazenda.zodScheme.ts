import z from "zod";

// Schema para criar Fazenda (body)
export const createFazendaSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome da fazenda é obrigatório")
        .max(255, "Nome muito longo (máx. 255 caracteres)"),
    endereco: z
        .string()
        .min(3, "Endereço é obrigatório")
        .max(255, "Endereço muito longo (máx. 255 caracteres)"),
    cidade: z
        .string()
        .min(3, "Cidade é obrigatória")
        .max(255, "Cidade muito longa (máx. 255 caracteres)"),
    estado: z
        .string()
        .length(2, "Estado deve ser a sigla (ex: MG, SP)"),
    pais: z
        .string()
        .min(3, "País é obrigatório")
        .max(255, "País muito longo (máx. 255 caracteres)"),
    porte: z.enum(
        ["PEQUENO", "MEDIO", "GRANDE"],
        "Porte inválido. Use PEQUENO, MEDIO ou GRANDE."
    ),

    // continua obrigatório e não aceita vazio ou só espaços
    afixo: z
        .string()
        .min(1, "Afixo é obrigatório")
        .refine((value) => value.trim().length > 0, {
            message: "Afixo é obrigatório",
        })
        .max(255, "Afixo muito longo (máx. 255 caracteres)"),

    prefixo: z.boolean({
        message: "Valor inválido para prefixo",
    }),
    sufixo: z.boolean({
        message: "Valor inválido para sufixo",
    }),
}).superRefine((data, ctx) => {
    // Regra de negócio: se prefixo ou sufixo estiver true, afixo não pode ser vazio
    if ((data.prefixo || data.sufixo) && !(data.afixo ?? "").trim()) {
        ctx.addIssue({
            code: "custom",
            path: ["afixo"],
            message: "Informe o texto do afixo quando marcar prefixo ou sufixo.",
        });
    }
});

// Schema para update (todos os campos opcionais)
export const updateFazendaSchema = createFazendaSchema.partial();

// Schema genérico para params com ID numérico
export const idParamSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
});

export const idProprietarioParamSchema = z.object({
    idProprietario: z
        .string()
        .regex(/^\d+$/, "idProprietario deve ser um número inteiro positivo"),
});

export const nomeParamSchema = z.object({
    nome: z
        .string()
        .min(1, "Nome é obrigatório"),
});
