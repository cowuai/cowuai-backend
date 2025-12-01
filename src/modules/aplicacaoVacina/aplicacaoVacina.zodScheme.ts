import zod from 'zod';

export const createAplicacaoVacinaSchema = zod.object({
    idAnimal: zod.bigint(),
    idTipoVacina: zod.bigint(),
    dataAplicacao: zod.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data de aplicação inválida",
    }),
    proximaDose: zod.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Data da próxima dose inválida",
    }),
    numeroDose: zod.number().positive().optional(),
    lote: zod.string().optional(),
    veterinario: zod.string().optional(),
    observacoes: zod.string().optional(),
});

export const updateAplicacaoVacinaSchema = zod.object({
    idAnimal: zod.bigint().optional(),
    idTipoVacina: zod.bigint().optional(),
    dataAplicacao: zod.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Data de aplicação inválida",
    }),
    proximaDose: zod.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Data da próxima dose inválida",
    }),
    numeroDose: zod.number().positive().optional(),
    lote: zod.string().optional(),
    veterinario: zod.string().optional(),
    observacoes: zod.string().optional(),
});