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
    console.log("🚀 Iniciando seed...");

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
            descricao: "Primeira dose entre 4 e 6 meses, reforço após 4 semanas.",
            obrigatoria: false,
            generoAlvo: null,
            minIdadeMeses: 4,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.SEMESTRAL,
        },
        {
            nome: "Clostridioses",
            descricao: "Primeira dose aos 2 meses e reforço após 30 dias.",
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
    console.log("✅ Tipos de vacina sincronizados.");

    // ====== USUÁRIOS ======
    const usuarios = [
        {
            nome: "Usuário de Teste",
            email: "teste@email.com",
            senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
            cpf: "12345678900",
            dataNascimento: new Date("1990-01-01"),
            ativo: true,
        },
        {
            nome: "Maria da Silva",
            email: "maria@fazenda.com",
            senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
            cpf: "98765432100",
            dataNascimento: new Date("1985-05-20"),
            ativo: true,
        },
        {
            nome: "João Pereira",
            email: "joao@agro.com",
            senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
            cpf: "11223344556",
            dataNascimento: new Date("1978-11-10"),
            ativo: true,
        },
        {
            nome: "Raphael Nathan Moreira",
            email: "rnathanmoreira@gmail.com",
            senha: "$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq",
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
    console.log("✅ Usuários sincronizados.");

    // ====== FAZENDAS ======
    const fazendas = [
        {
            nome: "Fazenda de Teste",
            afixo: "FAZENDA_TESTE",
            emailProprietario: "teste@email.com", // Usando email para buscar ID dinamicamente
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
            emailProprietario: "maria@fazenda.com",
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
    for (const f of fazendas) {
        // Busca o ID do proprietário atualizado
        const proprietario = usuariosCriados.find((u) => u.email === f.emailProprietario);

        if (!proprietario) {
            console.warn(`Proprietário não encontrado para fazenda ${f.nome}`);
            continue;
        }

        const dadosFazenda = {
            nome: f.nome,
            afixo: f.afixo,
            idProprietario: proprietario.id,
            cidade: f.cidade,
            estado: f.estado,
            pais: f.pais,
            porte: f.porte,
            prefixo: f.prefixo,
            sufixo: f.sufixo,
            endereco: f.endereco,
        };

        // LÓGICA DE IDEMPOTÊNCIA PARA FAZENDA (Sem @unique)
        // Busca por Nome E Proprietário
        const existing = await prisma.fazenda.findFirst({
            where: {
                idProprietario: proprietario.id,
                nome: f.nome
            },
        });

        let fazendaSalva;
        if (existing) {
            fazendaSalva = await prisma.fazenda.update({
                where: { id: existing.id },
                data: dadosFazenda,
            });
        } else {
            fazendaSalva = await prisma.fazenda.create({ data: dadosFazenda });
        }
        fazendasCriadas.push(fazendaSalva);
    }
    console.log("✅ Fazendas sincronizadas.");

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
            indexFazenda: 0, // Referência ao array de fazendasCriadas
            indexProprietario: 0, // Referência ao array de usuariosCriados
        },
        {
            numeroParticularProprietario: "ANIMAL002",
            nome: "Vaca Mimosa",
            sexo: SexoAnimal.FEMEA,
            dataNascimento: new Date("2019-06-15"),
            tipoRaca: TipoRaca.GIR,
            localizacao: "Curral A",
            status: StatusAnimal.VIVO,
            indexFazenda: 0,
            indexProprietario: 0,
        },
        {
            numeroParticularProprietario: "ANIMAL003",
            nome: "Bezerro Sol",
            sexo: SexoAnimal.MACHO,
            dataNascimento: new Date("2024-03-01"),
            tipoRaca: TipoRaca.GIROLANDO,
            localizacao: "Baias Novilhos",
            status: StatusAnimal.VIVO,
            indexFazenda: 1,
            indexProprietario: 1,
        },
        {
            numeroParticularProprietario: "ANIMAL004",
            nome: "Bezerra Estrela",
            sexo: SexoAnimal.FEMEA,
            dataNascimento: new Date("2024-05-01"),
            tipoRaca: TipoRaca.HOLANDES,
            localizacao: "Baia 5",
            status: StatusAnimal.VIVO,
            indexFazenda: 1,
            indexProprietario: 1,
        },
    ];

    const animaisCriados: any[] = [];

    for (const a of animais) {
        const dadosAnimal = {
            numeroParticularProprietario: a.numeroParticularProprietario,
            nome: a.nome,
            sexo: a.sexo,
            dataNascimento: a.dataNascimento,
            tipoRaca: a.tipoRaca,
            localizacao: a.localizacao,
            status: a.status,
            idFazenda: fazendasCriadas[a.indexFazenda].id,
            idProprietario: usuariosCriados[a.indexProprietario].id,
        };

        const animalSalvo = await prisma.animal.upsert({
            where: { numeroParticularProprietario: a.numeroParticularProprietario },
            update: dadosAnimal,
            create: dadosAnimal,
        });
        animaisCriados.push(animalSalvo);
    }
    console.log("✅ Animais sincronizados.");

    // ====== DOENÇAS (CATÁLOGO) ======
    const doencas = [
        { nome: "Mastite", descricao: "Inflamação da glândula mamária.", ehCronica: false },
        { nome: "Brucelose", descricao: "Doença bacteriana.", ehCronica: false },
        { nome: "Pododermatite", descricao: "Problema de casco.", ehCronica: true },
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
    console.log("✅ Catálogo de doenças sincronizado.");

    // ====== DOENÇAS DOS ANIMAIS ======
    // Helper para buscar IDs pelos nomes/códigos para ficar legível
    const getAnimalId = (num: string) => animaisCriados.find(a => a.numeroParticularProprietario === num)?.id;
    const getDoencaId = (nome: string) => doencasCriadas.find(d => d.nome === nome)?.id;

    const doencasAnimais = [
        {
            idAnimal: getAnimalId("ANIMAL002"), // Mimosa
            idDoenca: getDoencaId("Mastite"),
            dataDiagnostico: new Date("2024-02-10"),
            emTratamento: true,
            observacoes: "Tratamento com antibiótico por 7 dias.",
        },
        {
            idAnimal: getAnimalId("ANIMAL001"), // Boi Valente
            idDoenca: getDoencaId("Pododermatite"),
            dataDiagnostico: new Date("2024-03-05"),
            emTratamento: false,
            dataFimTratamento: new Date("2024-03-20"),
            observacoes: "Caso resolvido.",
        },
        {
            idAnimal: getAnimalId("ANIMAL002"), // Mimosa
            idDoenca: getDoencaId("Brucelose"),
            dataDiagnostico: new Date("2023-11-15"),
            emTratamento: false,
            dataFimTratamento: new Date("2023-12-15"),
            observacoes: "Vacinação realizada.",
        },
    ];

    for (const da of doencasAnimais) {
        if (!da.idAnimal || !da.idDoenca) continue;

        // Verificação manual de duplicidade
        const exists = await prisma.doencaAnimal.findFirst({
            where: {
                idAnimal: da.idAnimal,
                idDoenca: da.idDoenca,
                dataDiagnostico: da.dataDiagnostico,
            },
        });

        // Payload / cast para evitar erro de tipagem do TypeScript
        const payload = {
            idAnimal: da.idAnimal,
            idDoenca: da.idDoenca,
            dataDiagnostico: da.dataDiagnostico,
            emTratamento: da.emTratamento,
            observacoes: da.observacoes,
            ...(da.dataFimTratamento ? { dataFimTratamento: da.dataFimTratamento } : {}),
        } as any;

        if (!exists) {
            await prisma.doencaAnimal.create({ data: payload });
        } else {
            await prisma.doencaAnimal.update({
                where: { id: exists.id },
                data: payload,
            });
        }
    }
    console.log("✅ Histórico de doenças sincronizado.");

    // ====== VACINAS APLICADAS ======
    const getVacinaId = (nome: string) => vacinasCriadas.find(v => v.nome === nome)?.id;

    const aplicacoes = [
        {
            idAnimal: getAnimalId("ANIMAL001"),
            idTipoVacina: getVacinaId("Febre Aftosa"),
            dataAplicacao: new Date("2023-01-10"),
            proximaDose: new Date("2023-07-10"),
            lote: "L001",
            veterinario: "Dr. A",
            observacoes: "Aplicada com sucesso.",
        },
        {
            idAnimal: getAnimalId("ANIMAL002"),
            idTipoVacina: getVacinaId("Brucelose"),
            dataAplicacao: new Date("2023-03-05"),
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

    for (const app of aplicacoes) {
        if (!app.idAnimal || !app.idTipoVacina) continue;

        // Verificação manual de duplicidade
        const exists = await prisma.vacinaAplicada.findFirst({
            where: {
                idAnimal: app.idAnimal,
                idTipoVacina: app.idTipoVacina,
                dataAplicacao: app.dataAplicacao,
            },
        });

        // Construir payload explícito e remover possíveis `undefined` antes de enviar ao Prisma.
        const payload = {
            idAnimal: app.idAnimal,
            idTipoVacina: app.idTipoVacina,
            dataAplicacao: app.dataAplicacao,
            ...(app.proximaDose ? { proximaDose: app.proximaDose } : {}),
            ...(typeof app.numeroDose !== "undefined" ? { numeroDose: app.numeroDose } : {}),
            lote: app.lote,
            veterinario: app.veterinario,
            observacoes: app.observacoes,
        } as any;

        if (!exists) {
            await prisma.vacinaAplicada.create({ data: payload });
        }
    }
    console.log("✅ Histórico de vacinas sincronizado.");
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