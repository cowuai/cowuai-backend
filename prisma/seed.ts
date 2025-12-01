// prisma/seed.ts
import {
  PrismaClient,
  SexoAnimal,
  FrequenciaVacina,
  TipoRaca,
  StatusAnimal,
  Porte,
} from "@prisma/client";

const prisma = new PrismaClient() as any;

async function main() {
  console.log("Iniciando seed...");

  // ====== VACINAS ======
  const vacinas = [
    {
      nome: "Febre Aftosa",
      descricao: "Vacina obrigatória aplicada em duas etapas anuais.",
      obrigatoria: true,
      generoAlvo: null,
      minIdadeMeses: 0,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.SEMESTRAL,
    },
    {
      nome: "Brucelose",
      descricao: "Aplicada em fêmeas de 3 a 8 meses.",
      obrigatoria: true,
      generoAlvo: SexoAnimal.FEMEA,
      minIdadeMeses: 3,
      maxIdadeMeses: 8,
      frequencia: FrequenciaVacina.DOSE_UNICA,
    },
    {
      nome: "Raiva",
      descricao: "Vacina anual obrigatória em regiões com foco.",
      obrigatoria: true,
      generoAlvo: null,
      minIdadeMeses: 0,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
    {
      nome: "Leptospirose",
      descricao:
        "Primeira dose entre 4 e 6 meses, reforço após 4 semanas.",
      obrigatoria: false,
      generoAlvo: null,
      minIdadeMeses: 4,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.SEMESTRAL,
    },
    {
      nome: "Clostridioses",
      descricao:
        "Primeira dose aos 2 meses e reforço após 30 dias.",
      obrigatoria: true,
      generoAlvo: null,
      minIdadeMeses: 2,
      maxIdadeMeses: null,
      frequencia: FrequenciaVacina.ANUAL,
    },
  ];

  const vacinasCriadas: any[] = [];
  for (const vacina of vacinas) {
    const v = await prisma.tipoVacina.upsert({
      where: { nome: vacina.nome },
      update: vacina,
      create: vacina,
    });
    vacinasCriadas.push(v);
  }

  console.log("Seed de tipos de vacina concluído.");

  // ====== USUÁRIOS ======
  const usuarios = [
    {
      nome: "Usuário de Teste",
      email: "teste@email.com",
      senha:
        "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq", // "123456"
      cpf: "12345678900",
      dataNascimento: new Date("1990-01-01"),
      ativo: true,
    },
    {
      nome: "Maria da Silva",
      email: "maria@fazenda.com",
      senha:
        "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "98765432100",
      dataNascimento: new Date("1985-05-20"),
      ativo: true,
    },
    {
      nome: "João Pereira",
      email: "joao@agro.com",
      senha:
        "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "11223344556",
      dataNascimento: new Date("1978-11-10"),
      ativo: true,
    },
    {
      nome: "Raphael Nathan Moreira",
      email: "rnathanmoreira@gmail.com",
      senha:
        "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
      cpf: "00000000191",
      dataNascimento: new Date("1995-08-15"),
      ativo: true,
    },
  ];

  const usuariosCriados: any[] = [];
  for (const usuario of usuarios) {
    const u = await prisma.usuario.upsert({
      where: { email: usuario.email },
      update: usuario,
      create: usuario,
    });
    usuariosCriados.push(u);
  }
  console.log("Usuários criados.");

  // ====== FAZENDAS ======
  const fazendas = [
    {
      nome: "Fazenda de Teste",
      afixo: "FAZENDA_TESTE",
      idProprietario: usuariosCriados[0].id,
      cidade: "Cidade Teste",
      estado: "SP",
      pais: "Brasil",
      porte: Porte.MEDIO,
      prefixo: false,
      sufixo: true,
      endereco: "Rua de Teste, 123",
    },
    {
      nome: "Fazenda Santa Luzia",
      afixo: "FAZ_SANTALUZIA",
      idProprietario: usuariosCriados[1].id,
      cidade: "Uberaba",
      estado: "MG",
      pais: "Brasil",
      porte: Porte.GRANDE,
      prefixo: true,
      sufixo: false,
      endereco: "Rodovia BR-262, km 45",
    },
  ];

  const fazendasCriadas: any[] = [];
  for (const fazenda of fazendas) {
    const f = await prisma.fazenda.upsert({
      where: { afixo: fazenda.afixo },
      update: fazenda,
      create: fazenda,
    });
    fazendasCriadas.push(f);
  }
  console.log("Fazendas criadas.");

  // ====== ANIMAIS ======
  const animais = [
    {
      numeroParticularProprietario: "ANIMAL001",
      nome: "Boi Valente",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date("2020-01-01"),
      tipoRaca: TipoRaca.NELORE,
      localizacao: "Pasto Norte",
      status: StatusAnimal.VIVO,
      idFazenda: fazendasCriadas[0].id,
      idProprietario: usuariosCriados[0].id,
    },
    {
      numeroParticularProprietario: "ANIMAL002",
      nome: "Vaca Mimosa",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date("2019-06-15"),
      tipoRaca: TipoRaca.GIR,
      localizacao: "Curral A",
      status: StatusAnimal.VIVO,
      idFazenda: fazendasCriadas[0].id,
      idProprietario: usuariosCriados[0].id,
    },
    {
      numeroParticularProprietario: "ANIMAL003",
      nome: "Bezerro Sol",
      sexo: SexoAnimal.MACHO,
      dataNascimento: new Date("2024-03-01"),
      tipoRaca: TipoRaca.GIROLANDO,
      localizacao: "Baias Novilhos",
      status: StatusAnimal.VIVO,
      idFazenda: fazendasCriadas[1].id,
      idProprietario: usuariosCriados[1].id,
    },
    {
      numeroParticularProprietario: "ANIMAL004",
      nome: "Bezerra Estrela",
      sexo: SexoAnimal.FEMEA,
      dataNascimento: new Date("2024-05-01"),
      tipoRaca: TipoRaca.HOLANDES,
      localizacao: "Baia 5",
      status: StatusAnimal.VIVO,
      idFazenda: fazendasCriadas[1].id,
      idProprietario: usuariosCriados[1].id,
    },
  ];

  const animaisCriados: any[] = [];
  for (const animal of animais) {
    const a = await prisma.animal.upsert({
      where: {
        numeroParticularProprietario:
          animal.numeroParticularProprietario,
      },
      update: animal,
      create: animal,
    });
    animaisCriados.push(a);
  }
  console.log("Animais criados.");

  // ====== DOENÇAS (CATÁLOGO) ======
  const doencas = [
    {
      nome: "Mastite",
      descricao: "Inflamação da glândula mamária.",
      ehCronica: false,
    },
    {
      nome: "Brucelose",
      descricao:
        "Doença bacteriana que pode causar aborto em bovinos.",
      ehCronica: false,
    },
    {
      nome: "Pododermatite",
      descricao:
        "Problema de casco que pode se tornar crônico.",
      ehCronica: true,
    },
  ];

  const doencasCriadas: any[] = [];
  for (const doenca of doencas) {
    const d = await prisma.doenca.upsert({
      where: { nome: doenca.nome },
      update: doenca,
      create: doenca,
    });
    doencasCriadas.push(d);
  }
  console.log("Doenças criadas.");

  // ====== DOENÇAS DOS ANIMAIS ======
  const doencasAnimais = [
    {
      idAnimal: animaisCriados[1].id, // Vaca Mimosa
      idDoenca: doencasCriadas[0].id, // Mastite
      dataDiagnostico: new Date("2024-02-10"),
      emTratamento: true,
      dataInicioTratamento: new Date("2024-02-10"),
      dataFimTratamento: null,
      observacoes: "Tratamento com antibiótico por 7 dias.",
    },
    {
      idAnimal: animaisCriados[0].id, // Boi Valente
      idDoenca: doencasCriadas[2].id, // Pododermatite
      dataDiagnostico: new Date("2024-03-05"),
      emTratamento: false,
      dataInicioTratamento: new Date("2024-03-05"),
      dataFimTratamento: new Date("2024-03-20"),
      observacoes: "Caso resolvido, animal liberado para o pasto.",
    },
  ];

  for (const doencaAnimal of doencasAnimais) {
    await prisma.doencaAnimal.create({ data: doencaAnimal });
  }
  console.log("Doenças de animais criadas.");

  // ====== VACINAS APLICADAS ======
  const aplicacoes = [
    {
      idAnimal: animaisCriados[0].id,
      idTipoVacina: vacinasCriadas[0].id,
      dataAplicacao: new Date("2023-01-10"),
      proximaDose: new Date("2023-07-10"),
      numeroDose: 1,
      lote: "L001",
      veterinario: "Dr. A",
      observacoes: "Aplicada com sucesso.",
    },
    {
      idAnimal: animaisCriados[1].id,
      idTipoVacina: vacinasCriadas[1].id,
      dataAplicacao: new Date("2023-03-05"),
      proximaDose: null,
      numeroDose: 1,
      lote: "L002",
      veterinario: "Dra. B",
      observacoes: "Sem reações.",
    },
    {
      idAnimal: animaisCriados[2].id,
      idTipoVacina: vacinasCriadas[2].id,
      dataAplicacao: new Date("2024-01-10"),
      proximaDose: new Date("2025-01-10"),
      numeroDose: 1,
      lote: "L010",
      veterinario: "Dr. C",
      observacoes: "Bezerro saudável.",
    },
  ];

  for (const aplicacao of aplicacoes) {
    await prisma.vacinaAplicada.create({ data: aplicacao });
  }
  console.log("Aplicações de vacina criadas.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed finalizado com sucesso.");
  })
  .catch(async (e) => {
    console.error("Erro ao executar seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
