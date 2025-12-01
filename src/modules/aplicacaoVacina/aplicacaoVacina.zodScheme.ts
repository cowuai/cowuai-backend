import zod from 'zod';

export const createAplicacaoVacinaSchema = zod.object({
    idAnimal: zod.bigint(),
    idTipoVacina: zod.bigint(),
    dataAplicacao: zod.date(),
    proximaDose: zod.date().nullable().optional(),
    numeroDose: zod.number().positive().nullable().optional(),
    lote: zod.string().nullable().optional(),
    veterinario: zod.string().nullable().optional(),
    observacoes: zod.string().nullable().optional(),
});

export const updateAplicacaoVacinaSchema = zod.object({
    dataAplicacao: zod.date().optional(),
    proximaDose: zod.date().nullable().optional(),
    numeroDose: zod.number().positive().nullable().optional(),
    lote: zod.string().nullable().optional(),
    veterinario: zod.string().nullable().optional(),
    observacoes: zod.string().nullable().optional(),
});