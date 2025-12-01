import { z } from "zod";

// Definindo os Enums conforme seu Prisma
const SexoAnimalEnum = z.enum(["MACHO", "FEMEA", "TODOS"]);
const StatusAnimalEnum = z.enum(["VIVO", "FALECIDO", "VENDIDO", "DOADO", "ROUBADO", "DOENTE", "REPRODUZINDO"]);
const TipoRacaEnum = z.enum([
  "NELORE", "GIR", "GIROLANDO", "BRAHMAN", "GUZERATE", "SINDI", "ANGUS", "BRANGUS", 
  "LIMOUSIN", "CHIANINA", "DEVON", "BELGIANBLUE", "HEREFORD", "CANCHIM", "TABAPUA", 
  "CARACU", "SENEPOL", "CHAROLAISE", "INDUBRASIL", "WAGYU", "SIMMENTAL", "CRIOULO", 
  "JERSEY", "HOLANDES", "MURRAH", "MESTICO", "OUTROS"
]);

// Helper para validar IDs que são BigInt no banco (aceita number ou string numérica)
const idSchema = z.coerce.number({ invalid_type_error: "ID deve ser um número válido" })
  .int().positive("ID deve ser um número positivo");

export const createAnimalSchema = z.object({
  body: z.object({
    nome: z.string({ required_error: "O nome é obrigatório" }).min(1),
    
    tipoRaca: TipoRacaEnum,
    
    sexo: SexoAnimalEnum,
    
    // Opcionais
    composicaoRacial: z.string().optional(),
    
    // coerce.date transforma "2023-01-01" em Date
    dataNascimento: z.coerce.date().optional(),
    
    numeroParticularProprietario: z.string().optional(),
    
    registro: z.string().optional(),
    
    status: StatusAnimalEnum.optional().default("VIVO"),
    
    peso: z.coerce.number().positive().optional(),
    
    localizacao: z.string().optional(),

    // IDs de relacionamento (BigInt)
    idFazenda: idSchema, // Obrigatório
    idProprietario: idSchema.optional(),
    idPai: idSchema.optional(),
    idMae: idSchema.optional(),
  }),
});

export const updateAnimalSchema = z.object({
  params: z.object({
    id: idSchema, // Valida o ID da URL
  }),
  body: z.object({
    nome: z.string().min(1).optional(),
    tipoRaca: TipoRacaEnum.optional(),
    sexo: SexoAnimalEnum.optional(),
    composicaoRacial: z.string().optional(),
    dataNascimento: z.coerce.date().optional(),
    numeroParticularProprietario: z.string().optional(),
    registro: z.string().optional(),
    status: StatusAnimalEnum.optional(),
    peso: z.coerce.number().positive().optional(),
    localizacao: z.string().optional(),
    idFazenda: idSchema.optional(),
    idProprietario: idSchema.optional(),
    idPai: idSchema.optional(),
    idMae: idSchema.optional(),
  }),
});

export const getAnimalByIdSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});