import zod from 'zod';

export const createTipoVacinaSchema = zod.object({
    nome: zod.string().min(1, { message: "Nome é obrigatório" }),
    descricao: zod.string().optional(),
    obrigatoria: zod.boolean('É necessário especificar se a vacina é obrigatória'),
    generoAlvo: zod.string().optional(),
    minIdadeMeses: zod.number().int().nonnegative().optional(),
    maxIdadeMeses: zod.number().int().nonnegative().optional(),
    frequencia: zod.number().int().positive().optional(),
});

export const updateTipoVacinaSchema = zod.object({
    nome: zod.string().min(1, { message: "Nome é obrigatório" }).optional(),
    descricao: zod.string().optional(),
    obrigatoria: zod.boolean().optional(),
    generoAlvo: zod.string().optional(),
    minIdadeMeses: zod.number().int().nonnegative().optional(),
    maxIdadeMeses: zod.number().int().nonnegative().optional(),
    frequencia: zod.number().int().positive().optional(),
});