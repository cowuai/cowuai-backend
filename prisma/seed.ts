import { PrismaClient, SexoAnimal, FrequenciaVacina } from "@prisma/client";
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