import {
    PrismaClient,
    SexoAnimal,
    FrequenciaVacina,
    TipoRaca,
    StatusAnimal,
    Porte, VacinaAplicada,
    $Enums,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  
  // ====== VACINAS (INDIVIDUAIS) ======
  const vacinaFebreAftosa = await prisma.tipoVacina.upsert({
    where: { nome: "Febre Aftosa" },
    update: {},
    create: {
      nome: "Febre Aftosa",
      descricao: "Vacina obrigatória aplicada em duas etapas anuais.",
      obrigatoria: true,
      generoAlvo: null,
      minIdadeMeses: 0,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.SEMESTRAL,
    },
  });

  const vacinaBrucelose = await prisma.tipoVacina.upsert({
    where: { nome: "Brucelose" },
    update: {},
    create: {
      nome: "Brucelose",
      descricao: "Aplicada em fêmeas de 3 a 8 meses.",
      obrigatoria: true,
      generoAlvo: SexoAnimal.FEMEA,
      minIdadeMeses: 3,
      maxIdadeMeses: 8,
      frequencia: FrequenciaVacina.DOSE_UNICA,
    },
  });

  const vacinaRaiva = await prisma.tipoVacina.upsert({
    where: { nome: "Raiva" },
    update: {},
    create: {
      nome: "Raiva",
      descricao: "Vacina anual obrigatória em regiões com foco.",
      obrigatoria: true,
      generoAlvo: null,
      minIdadeMeses: 0,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
  });

  const vacinaLeptospirose = await prisma.tipoVacina.upsert({
    where: { nome: "Leptospirose" },
    update: {},
    create: {
      nome: "Leptospirose",
      descricao: "Primeira dose entre 4 e 6 meses, reforço após 4 semanas.",
      obrigatoria: false,
      generoAlvo: null,
      minIdadeMeses: 4,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.SEMESTRAL,
    },
  });

  const vacinaClostridioses = await prisma.tipoVacina.upsert({
    where: { nome: "Clostridioses" },
    update: {},
    create: {
      nome: "Clostridioses",
      descricao: "Primeira dose aos 2 meses e reforço após 30 dias.",
      obrigatoria: true,
      generoAlvo: null,
      minIdadeMeses: 2,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
  });

  const vacinaBotulismo = await prisma.tipoVacina.upsert({
    where: { nome: "Botulismo" },
    update: {},
    create: {
      nome: "Botulismo",
      descricao: "Vacina essencial contra toxinas botulínicas.",
      obrigatoria: false,
      generoAlvo: null,
      minIdadeMeses: 4,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
  });

  const vacinaCarbunculo = await prisma.tipoVacina.upsert({
    where: { nome: "Carbúnculo Sintomático" },
    update: {},
    create: {
      nome: "Carbúnculo Sintomático",
      descricao: "Recomendada para bovinos jovens e adultos.",
      obrigatoria: false,
      generoAlvo: null,
      minIdadeMeses: 3,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
  });

  const vacinaIBRBVD = await prisma.tipoVacina.upsert({
    where: { nome: "IBR/BVD" },
    update: {},
    create: {
      nome: "IBR/BVD",
      descricao: "Proteção contra doenças respiratórias e reprodutivas.",
      obrigatoria: false,
      generoAlvo: null,
      minIdadeMeses: 4,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
  });

  console.log("Seed de tipos de vacina concluído.");

  // ====== USUÁRIOS (INDIVIDUAIS) ======
  const usuario1 = await prisma.usuario.upsert({
    where: { email: "teste@email.com" },
    update: {},
    create: {
      nome: "Usuário de Teste",
      email: "teste@email.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "12345678900",
      dataNascimento: new Date("1990-01-01"),
      ativo: true,
    },
  });

  const usuario2 = await prisma.usuario.upsert({
    where: { email: "maria@fazenda.com" },
    update: {},
    create: {
      nome: "Maria da Silva",
      email: "maria@fazenda.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "98765432100",
      dataNascimento: new Date("1985-05-20"),
      ativo: true,
    },
  });

  const usuario3 = await prisma.usuario.upsert({
    where: { email: "joao@agro.com" },
    update: {},
    create: {
      nome: "João Pereira",
      email: "joao@agro.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "11223344556",
      dataNascimento: new Date("1978-11-10"),
      ativo: true,
    },
  });

  const usuario4 = await prisma.usuario.upsert({
    where: { email: "rnathanmoreira@gmail.com" },
    update: {},
    create: {
      nome: "Raphael Nathan Moreira",
      email: "rnathanmoreira@gmail.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "00000000191",
      dataNascimento: new Date("1995-08-15"),
      ativo: true,
    },
  });

  const usuario5 = await prisma.usuario.upsert({
    where: { email: "carlos@fazenda.com" },
    update: {},
    create: {
      nome: "Carlos Andrade",
      email: "carlos@fazenda.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "99887766554",
      dataNascimento: new Date("1982-04-22"),
      ativo: true,
    },
  });

  const usuario6 = await prisma.usuario.upsert({
    where: { email: "fernanda@agro.com" },
    update: {},
    create: {
      nome: "Fernanda Lopes",
      email: "fernanda@agro.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "77665544332",
      dataNascimento: new Date("1991-12-03"),
      ativo: true,
    },
  });

  const usuario7 = await prisma.usuario.upsert({
    where: { email: "larissa.beatriz@email.com" },
    update: {},
    create: {
      nome: "Larissa Beatriz",
      email: "larissa.beatriz@email.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "12345678901",
      dataNascimento: new Date("1993-07-15"),
      ativo: true,
    },
  });

  const usuario8 = await prisma.usuario.upsert({
    where: { email: "victoria.santos@email.com" },
    update: {},
    create: {
      nome: "Victoria Santos",
      email: "victoria.santos@email.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "23456789012",
      dataNascimento: new Date("1995-10-16"),
      ativo: true,
    },
  });

  const usuario9 = await prisma.usuario.upsert({
    where: { email: "maria.emilia.rodrigues@email.com" },
    update: {},
    create: {
      nome: "Maria Emilia Rodrigues",
      email: "maria.emilia.rodrigues@email.com",
      senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "34567890123",
      dataNascimento: new Date("1996-03-08"),
      ativo: true,
    },
  });

  console.log("Usuários criados.");

  // ====== FAZENDAS (INDIVIDUAIS) ======
  const fazenda1 = await prisma.fazenda.upsert({
    where: { afixo: "FAZENDA_PASTO_VERDEJANTE" },
    update: {},
    create: {
      nome: "Fazenda Pasto Verdejante",
      afixo: "FAZENDA_PASTO_VERDEJANTE",
      idProprietario: usuario1.id,
      cidade: "Sorocaba",
      estado: "SP",
      pais: "Brasil",
      porte: Porte.MEDIO,
      prefixo: false,
      sufixo: true,
      endereco: "Estrada Rural São Bento, km 12",
    },
  });

  const fazenda2 = await prisma.fazenda.upsert({
    where: { afixo: "FAZ_SANTALUZIA" },
    update: {},
    create: {
      nome: "Fazenda Santa Luzia",
      afixo: "FAZ_SANTALUZIA",
      idProprietario: usuario2.id,
      cidade: "Uberaba",
      estado: "MG",
      pais: "Brasil",
      porte: Porte.GRANDE,
      prefixo: true,
      sufixo: false,
      endereco: "Rodovia BR-262, km 45",
    },
  });

  const fazenda3 = await prisma.fazenda.upsert({
    where: { afixo: "FAZ_NOVOHORIZ" },
    update: {},
    create: {
      nome: "Fazenda Novo Horizonte",
      afixo: "FAZ_NOVOHORIZ",
      idProprietario: usuario5.id,
      cidade: "Ribeirão Preto",
      estado: "SP",
      pais: "Brasil",
      porte: Porte.GRANDE,
      prefixo: true,
      sufixo: false,
      endereco: "Estrada Municipal 120",
    },
  });

  const fazenda4 = await prisma.fazenda.upsert({
    where: { afixo: "FAZ_VALEVERDE" },
    update: {},
    create: {
      nome: "Fazenda Vale Verde",
      afixo: "FAZ_VALEVERDE",
      idProprietario: usuario6.id,
      cidade: "Campo Grande",
      estado: "MS",
      pais: "Brasil",
      porte: Porte.MEDIO,
      prefixo: false,
      sufixo: true,
      endereco: "Fazenda 27, Zona Rural",
    },
  });

  console.log("Fazendas criadas.");

  // ====== ANIMAIS (INDIVIDUAIS) ======
  const animal1 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL001" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL001",
      nome: "Valente",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date("2020-01-01"),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Norte",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-NEL-001-2020",
      peso: 620.5,
    },
  });

  const animal2 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL002" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL002",
      nome: "Mimosa",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date("2019-06-15"),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Curral A",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GIR-002-2019",
      peso: 480.0,
    },
  });

  const animal3 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL003" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL003",
      nome: "Aurora",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date("2024-03-01"),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Baia de Engorda",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda2.id,
      idProprietario: usuario2.id,
      registro: "BR-GRL-003-2024",
      peso: 320.0,
      idPai: null,
      idMae: null,
    },
  });

  const animal4 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL004" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL004",
      nome: "Estrela",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date("2024-05-01"),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Baia de Maternidade",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda2.id,
      idProprietario: usuario2.id,
      registro: "BR-HOL-004-2024",
      peso: 280.0,
    },
  });

  const animal5 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL005" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL005",
      nome: "Bravo",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date("2018-09-10"),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Pasto Leste",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda3.id,
      idProprietario: usuario5.id,
      registro: "BR-ANG-005-2018",
      peso: 650.0,
    },
  });

  const animal6 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL006" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL006",
      nome: "Serena",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date("2020-10-15"),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Curral Principal",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda4.id,
      idProprietario: usuario6.id,
      registro: "BR-NEL-006-2020",
      peso: 510.0,
    },
  });

  const animal7 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "ANIMAL007" },
    update: {},
    create: {
      numeroParticularProprietario: "ANIMAL007",
      nome: "Relâmpago",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date("2024-02-02"),
      tipoRaca: TipoRaca.GUZERATE,
      localizacao: "Baia de Engorda",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda3.id,
      idProprietario: usuario5.id,
      registro: "BR-GUZ-007-2024",
      peso: 350.0,
      idPai: null,
      idMae: null,
    },
  });

  const animal8 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-201" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-201",
      nome: "Princesa 1",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2020, 0, 1),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Norte",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 263.5,
    },
  });

  const animal9 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-202" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-202",
      nome: "Mimosa 2",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2020, 1, 4),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Pasto Sul",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GIR-102-2023",
      peso: 277.0,
    },
  });

  const animal10 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-203" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-203",
      nome: "Serena 3",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2020, 2, 6),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Pasto Leste",
      status: StatusAnimal.DOENTE,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 290.5,
    },
  });

  const animal11 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-204" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-204",
      nome: "Bonita 4",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2020, 3, 8),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Pasto Oeste",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-HOL-104-2023",
      peso: 304.0,
    },
  });

  const animal12 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-205" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-205",
      nome: "Dourada 5",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2020, 4, 10),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Pasto Central",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 317.5,
    },
  });

  const animal13 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-206" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-206",
      nome: "Mansa 6",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2020, 5, 12),
      tipoRaca: TipoRaca.GUZERATE,
      localizacao: "Pasto Alto",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GUZ-106-2023",
      peso: 331.0,
    },
  });

  const animal14 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-207" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-207",
      nome: "Suave 7",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2020, 6, 14),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Baixo",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 344.5,
    },
  });

  const animal15 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-208" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-208",
      nome: "Graça 8",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2020, 7, 16),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Pastagem Verde",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GIR-108-2023",
      peso: 358.0,
    },
  });

  const animal16 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-209" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-209",
      nome: "Valente 9",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2020, 8, 18),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Curral B",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 371.5,
    },
  });

  const animal17 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-210" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-210",
      nome: "Bravo 10",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2020, 9, 20),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Curral C",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-HOL-110-2023",
      peso: 385.0,
    },
  });

  const animal18 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-211" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-211",
      nome: "Forte 11",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2021, 0, 22),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Curral Principal",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 398.5,
    },
  });

  const animal19 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-212" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-212",
      nome: "Guardião 12",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2021, 1, 24),
      tipoRaca: TipoRaca.GUZERATE,
      localizacao: "Baia de Maternidade",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GUZ-112-2023",
      peso: 412.0,
    },
  });

  const animal20 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-213" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-213",
      nome: "Senhor 13",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2021, 2, 26),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Baia de Engorda",
      status: StatusAnimal.DOENTE,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 425.5,
    },
  });

  const animal21 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-214" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-214",
      nome: "Mestre 14",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2021, 3, 28),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Baia de Isolamento",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GIR-114-2023",
      peso: 439.0,
    },
  });

  const animal22 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-215" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-215",
      nome: "Rei 15",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2021, 4, 2),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Baia de Repouso",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 452.5,
    },
  });

  const animal23 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-216" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-216",
      nome: "Touro 16",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2021, 5, 4),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Pastagem da Água",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-HOL-116-2023",
      peso: 466.0,
    },
  });

  const animal24 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-217" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-217",
      nome: "Aurora 17",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2021, 6, 6),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Pastagem Seca",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 479.5,
    },
  });

  const animal25 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-218" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-218",
      nome: "Lua 18",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2021, 7, 8),
      tipoRaca: TipoRaca.GUZERATE,
      localizacao: "Pastagem Frutífera",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GUZ-118-2023",
      peso: 493.0,
    },
  });

  const animal26 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-219" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-219",
      nome: "Estrela 19",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2021, 8, 10),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Área de Descanso",
      status: StatusAnimal.DOENTE,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 506.5,
    },
  });

  const animal27 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-220" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-220",
      nome: "Diamante 20",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2021, 9, 12),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Pasto Norte",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GIR-120-2023",
      peso: 520.0,
    },
  });

  const animal28 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-221" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-221",
      nome: "Ouro 21",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2021, 10, 14),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Pasto Sul",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 533.5,
    },
  });

  const animal29 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-222" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-222",
      nome: "Pérola 22",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2021, 11, 16),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Pasto Leste",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-HOL-122-2023",
      peso: 547.0,
    },
  });

  const animal30 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-223" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-223",
      nome: "Rosa 23",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2022, 0, 18),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Pasto Oeste",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 560.5,
    },
  });

  const animal31 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-224" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-224",
      nome: "Violeta 24",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2022, 1, 20),
      tipoRaca: TipoRaca.GUZERATE,
      localizacao: "Pasto Central",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GUZ-124-2023",
      peso: 574.0,
    },
  });

  const animal32 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-225" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-225",
      nome: "Relâmpago 25",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2022, 2, 22),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Alto",
      status: StatusAnimal.DOENTE,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 587.5,
    },
  });

  const animal33 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-226" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-226",
      nome: "Vendaval 26",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2022, 3, 24),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Pasto Baixo",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GIR-126-2023",
      peso: 601.0,
    },
  });

  const animal34 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-227" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-227",
      nome: "Trovão 27",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2022, 4, 26),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Pastagem Verde",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 614.5,
    },
  });

  const animal35 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-228" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-228",
      nome: "Fogo 28",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2022, 5, 28),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Curral A",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-HOL-128-2023",
      peso: 628.0,
    },
  });

  const animal36 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-229" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-229",
      nome: "Tempestade 29",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2022, 6, 30),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Curral B",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 641.5,
    },
  });

  const animal37 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-230" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-230",
      nome: "Furacão 30",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2022, 8, 2),
      tipoRaca: TipoRaca.GUZERATE,
      localizacao: "Curral C",
      status: StatusAnimal.VENDIDO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-GUZ-130-2023",
      peso: 655.0,
    },
  });

  const animal38 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-231" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-231",
      nome: "Jade 31",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2022, 9, 4),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Sombra",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 512.0,
      idPai: animal1.id,
      idMae: animal2.id,
    },
  });

  const animal39 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-232" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-232",
      nome: "Cedro 32",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2022, 10, 12),
      tipoRaca: TipoRaca.ANGUS,
      localizacao: "Pasto Norte",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-ANG-232-2022",
      peso: 540.0,
      idPai: animal5.id,
      idMae: animal6.id,
    },
  });

  const animal40 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-233" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-233",
      nome: "Cometa 33",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2023, 0, 18),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Pasto Alto",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 276.0,
      idPai: animal39.id,
      idMae: animal38.id,
    },
  });

  const animal41 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-234" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-234",
      nome: "Brisa 34",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date(2023, 2, 22),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Baia de Maternidade",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: "BR-HOL-234-2023",
      peso: 248.0,
      idPai: animal40.id,
      idMae: animal34.id,
    },
  });

  const animal42 = await prisma.animal.upsert({
    where: { numeroParticularProprietario: "BOV-235" },
    update: {},
    create: {
      numeroParticularProprietario: "BOV-235",
      nome: "Raio 35",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date(2023, 5, 6),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Central",
      status: StatusAnimal.VIVO,
      idFazenda: fazenda1.id,
      idProprietario: usuario1.id,
      registro: null,
      peso: 233.5,
      idPai: animal40.id,
      idMae: animal41.id,
    },
  });

  console.log("Animais criados.");

  // ====== GENEALOGIA (PAIS E MÃES) - INDIVIDUAIS ======
  await prisma.animal.update({
    where: { numeroParticularProprietario: "ANIMAL003" },
    data: {
      idPai: animal1.id,
      idMae: animal2.id,
    },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "ANIMAL007" },
    data: {
      idPai: animal5.id,
      idMae: animal6.id,
    },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-203" },
    data: { idPai: animal1.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-205" },
    data: { idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-207" },
    data: { idPai: animal1.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-209" },
    data: { idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-211" },
    data: { idPai: animal5.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-213" },
    data: { idPai: animal1.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-215" },
    data: { idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-217" },
    data: { idPai: animal5.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-219" },
    data: { idPai: animal5.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-221" },
    data: { idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-223" },
    data: { idPai: animal1.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-225" },
    data: { idPai: animal1.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-227" },
    data: { idPai: animal5.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-229" },
    data: { idMae: animal2.id },
  });

  // Vínculos adicionais para ampliar árvore genealógica
  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-205" },
    data: { idPai: animal3.id, idMae: animal4.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-210" },
    data: { idPai: animal1.id, idMae: animal4.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-214" },
    data: { idPai: animal5.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-218" },
    data: { idPai: animal7.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-222" },
    data: { idPai: animal3.id, idMae: animal4.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-224" },
    data: { idPai: animal5.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-226" },
    data: { idPai: animal1.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-228" },
    data: { idPai: animal7.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-230" },
    data: { idPai: animal7.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-203" },
    data: { idPai: animal1.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-209" },
    data: { idPai: animal1.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-211" },
    data: { idPai: animal5.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-213" },
    data: { idPai: animal1.id, idMae: animal4.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-215" },
    data: { idPai: animal5.id, idMae: animal2.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-219" },
    data: { idPai: animal5.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-221" },
    data: { idPai: animal7.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-223" },
    data: { idPai: animal1.id, idMae: animal4.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-227" },
    data: { idPai: animal5.id, idMae: animal6.id },
  });

  await prisma.animal.update({
    where: { numeroParticularProprietario: "BOV-229" },
    data: { idPai: animal3.id, idMae: animal2.id },
  });

  // ====== DOENÇAS (CATÁLOGO) - INDIVIDUAIS ======
  const doenca1 = await prisma.doenca.upsert({
    where: { nome: "Mastite" },
    update: {},
    create: {
      nome: "Mastite",
      descricao: "Inflamação da glândula mamária.",
      ehCronica: false,
    },
  });

  const doenca2 = await prisma.doenca.upsert({
    where: { nome: "Brucelose" },
    update: {},
    create: {
      nome: "Brucelose",
      descricao: "Doença bacteriana que pode causar aborto em bovinos.",
      ehCronica: false,
    },
  });

  const doenca3 = await prisma.doenca.upsert({
    where: { nome: "Pododermatite" },
    update: {},
    create: {
      nome: "Pododermatite",
      descricao: "Problema de casco que pode se tornar crônico.",
      ehCronica: true,
    },
  });

  const doenca4 = await prisma.doenca.upsert({
    where: { nome: "Pneumonia Bovina" },
    update: {},
    create: {
      nome: "Pneumonia Bovina",
      descricao: "Infecção respiratória comum em bezerros.",
      ehCronica: false,
    },
  });

  const doenca5 = await prisma.doenca.upsert({
    where: { nome: "Manqueira" },
    update: {},
    create: {
      nome: "Manqueira",
      descricao: "Inflamação das articulações.",
      ehCronica: false,
    },
  });

  const doenca6 = await prisma.doenca.upsert({
    where: { nome: "Dermatite Nodular" },
    update: {},
    create: {
      nome: "Dermatite Nodular",
      descricao: "Doença viral transmitida por insetos.",
      ehCronica: false,
    },
  });

  const doenca7 = await prisma.doenca.upsert({
    where: { nome: "Tristeza Parasitária Bovina" },
    update: {},
    create: {
      nome: "Tristeza Parasitária Bovina",
      descricao: "Doença causada por protozoários transmitida por carrapatos.",
      ehCronica: true,
    },
  });

  const doenca8 = await prisma.doenca.upsert({
    where: { nome: "Anaplasmose" },
    update: {},
    create: {
      nome: "Anaplasmose",
      descricao: "Infecção bacteriana transmitida por artrópodes.",
      ehCronica: true,
    },
  });

  console.log("Doenças criadas.");

  // ====== DOENÇAS DOS ANIMAIS (INDIVIDUAIS) ======
  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal10.id,
      idDoenca: doenca1.id,
      dataDiagnostico: new Date("2024-02-10"),
      emTratamento: true,
      dataInicioTratamento: new Date("2024-02-10"),
      dataFimTratamento: null,
      observacoes: "Tratamento com antibiótico por 7 dias.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal15.id,
      idDoenca: doenca3.id,
      dataDiagnostico: new Date("2024-03-05"),
      emTratamento: false,
      dataInicioTratamento: new Date("2024-03-05"),
      dataFimTratamento: new Date("2024-03-20"),
      observacoes: "Caso resolvido, animal liberado para o pasto.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal17.id,
      idDoenca: doenca2.id,
      dataDiagnostico: new Date(2024, 2, 15),
      emTratamento: false,
      dataInicioTratamento: new Date(2024, 2, 15),
      dataFimTratamento: new Date(2024, 3, 10),
      observacoes: "Doença Brucelose registrada individualmente.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal20.id,
      idDoenca: doenca4.id,
      dataDiagnostico: new Date(2024, 3, 5),
      emTratamento: true,
      dataInicioTratamento: new Date(2024, 3, 5),
      dataFimTratamento: null,
      observacoes: "Doença Pneumonia Bovina registrada individualmente.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal23.id,
      idDoenca: doenca5.id,
      dataDiagnostico: new Date(2024, 4, 12),
      emTratamento: false,
      dataInicioTratamento: new Date(2024, 4, 12),
      dataFimTratamento: new Date(2024, 5, 2),
      observacoes: "Doença Manqueira registrada individualmente.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal26.id,
      idDoenca: doenca6.id,
      dataDiagnostico: new Date(2024, 5, 8),
      emTratamento: true,
      dataInicioTratamento: new Date(2024, 5, 8),
      dataFimTratamento: null,
      observacoes: "Doença Dermatite Nodular registrada individualmente.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal29.id,
      idDoenca: doenca7.id,
      dataDiagnostico: new Date(2024, 6, 20),
      emTratamento: false,
      dataInicioTratamento: new Date(2024, 6, 20),
      dataFimTratamento: new Date(2024, 7, 15),
      observacoes: "Doença Tristeza Parasitária Bovina registrada individualmente.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal32.id,
      idDoenca: doenca8.id,
      dataDiagnostico: new Date(2024, 7, 10),
      emTratamento: true,
      dataInicioTratamento: new Date(2024, 7, 10),
      dataFimTratamento: null,
      observacoes: "Doença Anaplasmose registrada individualmente.",
    },
  });

  await prisma.doencaAnimal.create({
    data: {
      idAnimal: animal35.id,
      idDoenca: doenca1.id,
      dataDiagnostico: new Date(2024, 8, 5),
      emTratamento: false,
      dataInicioTratamento: new Date(2024, 8, 5),
      dataFimTratamento: new Date(2024, 8, 25),
      observacoes: "Doença Mastite registrada individualmente.",
    },
  });

  console.log("Doenças de animais criadas.");

  // ====== VACINAS APLICADAS (INDIVIDUAIS) ======
  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal1.id,
      idTipoVacina: vacinaFebreAftosa.id,
      dataAplicacao: new Date("2023-01-10"),
      proximaDose: new Date("2023-07-10"),
      numeroDose: 1,
      lote: "L001",
      veterinario: "Dr. A",
      observacoes: "Aplicada com sucesso.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal2.id,
      idTipoVacina: vacinaBrucelose.id,
      dataAplicacao: new Date("2023-03-05"),
      proximaDose: null,
      numeroDose: 1,
      lote: "L002",
      veterinario: "Dra. B",
      observacoes: "Sem reações.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal3.id,
      idTipoVacina: vacinaRaiva.id,
      dataAplicacao: new Date("2024-01-15"),
      proximaDose: new Date("2025-01-15"),
      numeroDose: 1,
      lote: "L103",
      veterinario: "Dr. Rutherford",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal4.id,
      idTipoVacina: vacinaLeptospirose.id,
      dataAplicacao: new Date("2024-02-10"),
      proximaDose: new Date("2025-02-10"),
      numeroDose: 1,
      lote: "L104",
      veterinario: "Dr. Gaga",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal5.id,
      idTipoVacina: vacinaClostridioses.id,
      dataAplicacao: new Date("2024-03-05"),
      proximaDose: new Date("2025-03-05"),
      numeroDose: 1,
      lote: "L105",
      veterinario: "Dr. Selena",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal6.id,
      idTipoVacina: vacinaBotulismo.id,
      dataAplicacao: new Date("2024-04-01"),
      proximaDose: new Date("2025-04-01"),
      numeroDose: 1,
      lote: "L106",
      veterinario: "Dr. Dolittle",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal7.id,
      idTipoVacina: vacinaCarbunculo.id,
      dataAplicacao: new Date("2024-05-05"),
      proximaDose: new Date("2025-05-05"),
      numeroDose: 1,
      lote: "L107",
      veterinario: "Dr. Dolittle",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal8.id,
      idTipoVacina: vacinaIBRBVD.id,
      dataAplicacao: new Date("2024-02-20"),
      proximaDose: new Date("2025-02-20"),
      numeroDose: 1,
      lote: "L108",
      veterinario: "Dr. Dolittle",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal9.id,
      idTipoVacina: vacinaFebreAftosa.id,
      dataAplicacao: new Date("2024-03-02"),
      proximaDose: new Date("2025-03-02"),
      numeroDose: 1,
      lote: "L109",
      veterinario: "Dr. Dolittle",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal10.id,
      idTipoVacina: vacinaBrucelose.id,
      dataAplicacao: new Date("2024-03-10"),
      proximaDose: null,
      numeroDose: 1,
      lote: "L110",
      veterinario: "Dra. Stefani Joanne Angelina Germanotta",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal11.id,
      idTipoVacina: vacinaRaiva.id,
      dataAplicacao: new Date("2024-03-15"),
      proximaDose: new Date("2025-03-15"),
      numeroDose: 1,
      lote: "L111",
      veterinario: "Dra. Luisa Mell",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal12.id,
      idTipoVacina: vacinaLeptospirose.id,
      dataAplicacao: new Date("2024-03-20"),
      proximaDose: new Date("2025-03-20"),
      numeroDose: 1,
      lote: "L112",
      veterinario: "Dra. Luisa Mell",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal13.id,
      idTipoVacina: vacinaClostridioses.id,
      dataAplicacao: new Date("2024-03-25"),
      proximaDose: new Date("2025-03-25"),
      numeroDose: 1,
      lote: "L113",
      veterinario: "Dra. Luisa Mell",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal14.id,
      idTipoVacina: vacinaBotulismo.id,
      dataAplicacao: new Date("2024-04-05"),
      proximaDose: new Date("2025-04-05"),
      numeroDose: 1,
      lote: "L114",
      veterinario: "Dra. Marina Sena",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal15.id,
      idTipoVacina: vacinaCarbunculo.id,
      dataAplicacao: new Date("2024-04-12"),
      proximaDose: new Date("2025-04-12"),
      numeroDose: 1,
      lote: "L115",
      veterinario: "Dra. Marina Sena",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal16.id,
      idTipoVacina: vacinaIBRBVD.id,
      dataAplicacao: new Date("2024-04-18"),
      proximaDose: new Date("2025-04-18"),
      numeroDose: 1,
      lote: "L116",
      veterinario: "Dra. Marina Sena",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal17.id,
      idTipoVacina: vacinaFebreAftosa.id,
      dataAplicacao: new Date("2024-04-25"),
      proximaDose: new Date("2025-04-25"),
      numeroDose: 1,
      lote: "L117",
      veterinario: "Dr. Teste 17",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal18.id,
      idTipoVacina: vacinaBrucelose.id,
      dataAplicacao: new Date("2024-05-01"),
      proximaDose: null,
      numeroDose: 1,
      lote: "L118",
      veterinario: "Dr. Teste 18",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal19.id,
      idTipoVacina: vacinaRaiva.id,
      dataAplicacao: new Date("2024-05-08"),
      proximaDose: new Date("2025-05-08"),
      numeroDose: 1,
      lote: "L119",
      veterinario: "Dr. Teste 19",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal20.id,
      idTipoVacina: vacinaLeptospirose.id,
      dataAplicacao: new Date("2024-05-15"),
      proximaDose: new Date("2025-05-15"),
      numeroDose: 1,
      lote: "L120",
      veterinario: "Dr. Teste 20",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal21.id,
      idTipoVacina: vacinaClostridioses.id,
      dataAplicacao: new Date("2024-05-20"),
      proximaDose: new Date("2025-05-20"),
      numeroDose: 1,
      lote: "L121",
      veterinario: "Dr. Teste 21",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal22.id,
      idTipoVacina: vacinaBotulismo.id,
      dataAplicacao: new Date("2024-05-25"),
      proximaDose: new Date("2025-05-25"),
      numeroDose: 1,
      lote: "L122",
      veterinario: "Dr. Teste 22",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal23.id,
      idTipoVacina: vacinaCarbunculo.id,
      dataAplicacao: new Date("2024-06-01"),
      proximaDose: new Date("2025-06-01"),
      numeroDose: 1,
      lote: "L123",
      veterinario: "Dr. Teste 23",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal24.id,
      idTipoVacina: vacinaIBRBVD.id,
      dataAplicacao: new Date("2024-06-08"),
      proximaDose: new Date("2025-06-08"),
      numeroDose: 1,
      lote: "L124",
      veterinario: "Dr. Teste 24",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal25.id,
      idTipoVacina: vacinaFebreAftosa.id,
      dataAplicacao: new Date("2024-06-12"),
      proximaDose: new Date("2025-06-12"),
      numeroDose: 1,
      lote: "L125",
      veterinario: "Dr. Teste 25",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal26.id,
      idTipoVacina: vacinaBrucelose.id,
      dataAplicacao: new Date("2024-06-18"),
      proximaDose: null,
      numeroDose: 1,
      lote: "L126",
      veterinario: "Dr. Teste 26",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal27.id,
      idTipoVacina: vacinaRaiva.id,
      dataAplicacao: new Date("2024-06-22"),
      proximaDose: new Date("2025-06-22"),
      numeroDose: 1,
      lote: "L127",
      veterinario: "Dr. Teste 27",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal28.id,
      idTipoVacina: vacinaLeptospirose.id,
      dataAplicacao: new Date("2024-06-28"),
      proximaDose: new Date("2025-06-28"),
      numeroDose: 1,
      lote: "L128",
      veterinario: "Dr. Teste 28",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal29.id,
      idTipoVacina: vacinaClostridioses.id,
      dataAplicacao: new Date("2024-07-02"),
      proximaDose: new Date("2025-07-02"),
      numeroDose: 1,
      lote: "L129",
      veterinario: "Dr. Teste 29",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal30.id,
      idTipoVacina: vacinaBotulismo.id,
      dataAplicacao: new Date("2024-07-08"),
      proximaDose: new Date("2025-07-08"),
      numeroDose: 1,
      lote: "L130",
      veterinario: "Dr. Teste 30",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal31.id,
      idTipoVacina: vacinaCarbunculo.id,
      dataAplicacao: new Date("2024-07-12"),
      proximaDose: new Date("2025-07-12"),
      numeroDose: 1,
      lote: "L131",
      veterinario: "Dr. Teste 31",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal32.id,
      idTipoVacina: vacinaIBRBVD.id,
      dataAplicacao: new Date("2024-07-18"),
      proximaDose: new Date("2025-07-18"),
      numeroDose: 1,
      lote: "L132",
      veterinario: "Dr. Teste 32",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal33.id,
      idTipoVacina: vacinaFebreAftosa.id,
      dataAplicacao: new Date("2024-07-22"),
      proximaDose: new Date("2025-07-22"),
      numeroDose: 1,
      lote: "L133",
      veterinario: "Dr. Teste 33",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal34.id,
      idTipoVacina: vacinaBrucelose.id,
      dataAplicacao: new Date("2024-07-28"),
      proximaDose: null,
      numeroDose: 1,
      lote: "L134",
      veterinario: "Dr. Teste 34",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal35.id,
      idTipoVacina: vacinaRaiva.id,
      dataAplicacao: new Date("2024-08-05"),
      proximaDose: new Date("2025-08-05"),
      numeroDose: 1,
      lote: "L135",
      veterinario: "Dr. Teste 35",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal36.id,
      idTipoVacina: vacinaLeptospirose.id,
      dataAplicacao: new Date("2024-08-12"),
      proximaDose: new Date("2025-08-12"),
      numeroDose: 1,
      lote: "L136",
      veterinario: "Dr. Teste 36",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  await prisma.vacinaAplicada.create({
    data: {
      idAnimal: animal37.id,
      idTipoVacina: vacinaClostridioses.id,
      dataAplicacao: new Date("2024-08-18"),
      proximaDose: new Date("2025-08-18"),
      numeroDose: 1,
      lote: "L137",
      veterinario: "Dr. Teste 37",
      observacoes: "Vacina registrada individualmente.",
    },
  });

  console.log("Aplicações de vacina criadas.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("🏁 Seed finalizado com sucesso.");
    })
    .catch(async (e) => {
        console.error("❌ Erro ao executar seed:", e);
        await prisma.$disconnect();
        process.exit(1);
    });