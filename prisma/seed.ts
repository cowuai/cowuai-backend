import {PrismaClient, SexoAnimal, FrequenciaVacina, TipoRaca, StatusAnimal} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const vacinas = [
        {
            nome: 'Febre Aftosa',
            descricao: 'Vacina obrigatória aplicada em duas etapas anuais, conforme calendário do MAPA.',
            obrigatoria: true,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 0,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.SEMESTRAL,
        },
        {
            nome: 'Brucelose',
            descricao: 'Aplicada em fêmeas de 3 a 8 meses, sob supervisão de médico veterinário.',
            obrigatoria: true,
            generoAlvo: SexoAnimal.FEMEA,
            minIdadeMeses: 3,
            maxIdadeMeses: 8,
            frequencia: FrequenciaVacina.DOSE_UNICA,
        },
        {
            nome: 'Raiva',
            descricao: 'Vacina obrigatória em regiões com foco, aplicada anualmente em todo o rebanho.',
            obrigatoria: true,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 0,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'Leptospirose',
            descricao: 'Primeira dose entre 4 e 6 meses de idade, reforço após 4 semanas e revacinação semestral.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 4,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.SEMESTRAL,
        },
        {
            nome: 'Clostridioses',
            descricao: 'Recomenda-se em todos os animais; primeira dose aos 2 meses e reforço após 30 dias.',
            obrigatoria: true,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 2,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'Botulismo',
            descricao: 'Duas doses iniciais com 4 a 6 semanas de intervalo e reforço anual.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 2,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'IBR (Rinotraqueíte Infecciosa Bovina)',
            descricao: 'Vacinação recomendada aos 3 meses de idade, com reforço após 4 semanas e dose anual.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 3,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'BVD (Diarreia Viral Bovina)',
            descricao: 'Recomenda-se vacinação a partir dos 3 meses com reforço e revacinação anual.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 3,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'Mastite',
            descricao: 'Vacinação recomendada em vacas leiteiras, conforme orientação veterinária.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.FEMEA,
            minIdadeMeses: null,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'Campilobacteriose',
            descricao: 'Recomendada para animais em reprodução; aplicar um mês antes da estação de monta.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 12,
            maxIdadeMeses: null,
            frequencia: FrequenciaVacina.ANUAL,
        },
        {
            nome: 'Colibacilose',
            descricao: 'Vacinação recomendada em bezerros para prevenção de diarreias neonatais.',
            obrigatoria: false,
            generoAlvo: SexoAnimal.TODOS,
            minIdadeMeses: 1,
            maxIdadeMeses: 3,
            frequencia: FrequenciaVacina.DOSE_UNICA,
        },
    ]

    for (const vacina of vacinas) {
        await prisma.tipoVacina.upsert({
            where: { nome: vacina.nome },
            update: vacina,
            create: vacina,
        });
    }

    console.log('Seed de tipos de vacina concluído.');

    const usuarioTeste = await prisma.usuario.upsert({
        where: { email: 'teste@email.com' },
        update: {},
        create: {
            nome: 'Usuário de Teste',
            email: 'teste@email.com',
            senha: '$2a$12$nFxZ7y6hWAsXiE.bStThG.82hWkBarl7m5fLqzur72GFBuZ/XmEoq',
            cpf: '12345678900',
            dataNascimento: new Date("1990-01-01"),
            ativo: true,
        },
    });

    console.log('Seed de usuário de teste concluído.');

    const fazendaTeste = await prisma.fazenda.upsert({
        where: { afixo: 'FAZENDA_TESTE' },
        update: {},
        create: {
            nome: 'Fazenda de Teste',
            afixo: 'FAZENDA_TESTE',
            idProprietario: usuarioTeste.id,
            cidade: 'Cidade Teste',
            estado: 'Estado Teste',
            pais: 'País Teste',
            porte: 'MEDIO',
            prefixo: false,
            sufixo: true,
            endereco: 'Rua de Teste, 123',
        },
    });

    console.log('Seed de fazenda de teste concluído.');

    const animaisTeste = [
        {
            numeroParticularProprietario: 'ANIMAL001',
            nome: 'Animal Teste 1',
            sexo: SexoAnimal.MACHO,
            dataNascimento: new Date('2020-01-01'),
            tipoRaca: TipoRaca.GIR,
            localizacao: 'Baias 3',
            status: StatusAnimal.VIVO,
            idProprietario: usuarioTeste.id,
            idFazenda: fazendaTeste.id,
            idPai: null,
            idMae: null,
        },
        {
            numeroParticularProprietario: 'ANIMAL002',
            nome: 'Animal Teste 2',
            sexo: SexoAnimal.FEMEA,
            dataNascimento: new Date('2021-06-15'),
            tipoRaca: TipoRaca.HOLANDES,
            localizacao: 'Baias 5',
            status: StatusAnimal.VIVO,
            idProprietario: usuarioTeste.id,
            idFazenda: fazendaTeste.id,
            idPai: null,
            idMae: null,
        },
        {
            numeroParticularProprietario: 'ANIMAL003',
            nome: 'Animal Teste 3',
            sexo: SexoAnimal.FEMEA,
            dataNascimento: new Date('2019-11-20'),
            tipoRaca: TipoRaca.GIROLANDO,
            localizacao: 'Pastagem A',
            status: StatusAnimal.VIVO,
            idProprietario: usuarioTeste.id,
            idFazenda: fazendaTeste.id,
            idPai: 1n,
            idMae: 2n,
        }
    ];

    for (const animal of animaisTeste) {
        await prisma.animal.upsert({
            where: { numeroParticularProprietario: animal.numeroParticularProprietario! },
            update: animal,
            create: animal,
        });
    }

    console.log('Seed de animais de teste concluído.');

    const aplicacoesVacinaTeste = [
        {
            idAnimal: 1n,
            idTipoVacina: 1n,
            dataAplicacao: new Date('2023-01-10'),
            proximaDose: new Date('2023-07-10'),
            numeroDose: 1,
            lote: 'L001',
            veterinario: 'Dr. Veterinário A',
            observacoes: 'Nenhuma observação.',
        },
        {
            idAnimal: 2n,
            idTipoVacina: 2n,
            dataAplicacao: new Date('2023-02-15'),
            proximaDose: null,
            numeroDose: 1,
            lote: 'L002',
            veterinario: 'Dra. Veterinária B',
            observacoes: 'Aplicada sem complicações.',
        },
        {
            idAnimal: 3n,
            idTipoVacina: 3n,
            dataAplicacao: new Date('2023-03-20'),
            proximaDose: new Date('2024-03-20'),
            numeroDose: 1,
            lote: 'L003',
            veterinario: 'Dr. Veterinário C',
            observacoes: 'Reação leve no local da aplicação.',
        }
    ];

    for (const aplicacao of aplicacoesVacinaTeste) {
        await prisma.vacinaAplicada.create({
            data: aplicacao,
        });
    }

    console.log('Seed de aplicações de vacina de teste concluído.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });