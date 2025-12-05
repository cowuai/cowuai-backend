import {z} from "zod";
import {SexoAnimal, StatusAnimal, TipoRaca} from "@prisma/client";

// Helper para validar IDs que são BigInt no banco
const idSchema = z.coerce.number("ID deve ser um número válido")
    .int().positive("ID deve ser um número positivo");

const emptyToUndefined = z.literal("").transform(() => undefined);

const optionalString = z.string()
    .trim()
    .min(1, "Campo não pode ser vazio se informado")
    .max(255, "Campo não pode ultrapassar 255 caracteres")
    .optional()
    .or(emptyToUndefined)
    .or(z.null());

export const createAnimalSchema = z.object({
    body: z.object({
        nome: z.string("O nome é obrigatório").trim().min(1, "O nome não pode ser vazio").max(100, "O nome não pode ultrapassar 100 caracteres"),
        tipoRaca: z.enum(TipoRaca, "Tipo de raça é obrigatório"),
        sexo: z.enum(SexoAnimal, "Sexo do animal é obrigatório"),
        composicaoRacial: optionalString,
        dataNascimento: z.coerce.date().nullable().optional(),
        numeroParticularProprietario: z.string().trim().min(1, "O número particular não pode ser vazio").max(10, "O número particular não pode ultrapassar 10 caracteres").nullable().optional(),
        registro: z.string().trim().min(1, "O registro não pode ser vazio").max(10, "O registro não pode ultrapassar 10 caracteres").nullable().optional(),
        status: z.enum(StatusAnimal).optional().default("VIVO"),
        peso: z.coerce.number().positive("O peso deve ser positivo").max(2000, "O peso máximo é de 2 toneladas.").nullable().optional(),
        localizacao: optionalString,
        idFazenda: idSchema,
        idProprietario: idSchema,
        idPai: idSchema.nullable().optional(),
        idMae: idSchema.nullable().optional(),
    }),
});

export const updateAnimalSchema = z.object({
    params: z.object({id: idSchema}),
    body: z.object({
        nome: z.string().min(1).optional(),
        tipoRaca: z.enum(TipoRaca).optional(),
        sexo: z.enum(SexoAnimal).optional(),
        composicaoRacial: optionalString,
        dataNascimento: z.coerce.date().nullable().optional(),
        numeroParticularProprietario: z.string().trim().min(1, "O número particular não pode ser vazio").max(10, "O número particular não pode ultrapassar 10 caracteres").nullable().optional(),
        registro: z.string().trim().min(1, "O registro não pode ser vazio").max(10, "O registro não pode ultrapassar 10 caracteres").nullable().optional(),
        status: z.enum(StatusAnimal).optional(),
        peso: z.coerce.number().positive().max(2000, "O peso máximo é de 2 toneladas.").nullable().optional(),
        localizacao: optionalString,
        idFazenda: idSchema.optional(),
        idProprietario: idSchema.optional(),
        idPai: idSchema.nullable().optional(),
        idMae: idSchema.nullable().optional(),
    }),
});

export const getAnimalByIdSchema = z.object({
    params: z.object({
        id: idSchema,
    }),
});