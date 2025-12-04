import {Request, Response, NextFunction} from "express";
import {prisma} from "../../config/prisma";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = (req as any).user;

        // ------------------ VACINAÇÕES POR MÊS ------------------
        const vacinacoes = await prisma.vacinaAplicada.findMany({
            select: {dataAplicacao: true},
            where: {
                animal: {
                    fazenda: {
                        idProprietario: BigInt(userId),
                    },
                }
            }
        });

        const vacinacoesPorMesMap: Record<string, number> = {};
        vacinacoes.forEach(v => {
            const key = new Date(v.dataAplicacao).toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric",
            });
            vacinacoesPorMesMap[key] = (vacinacoesPorMesMap[key] || 0) + 1;
        });

        const vacinacoesPorMes = Object.entries(vacinacoesPorMesMap).map(([label, count]) => ({label, count}));

        // ------------------ ANIMAIS POR LOCALIZAÇÃO ------------------
        const animaisPorLocalizacaoRaw = await prisma.animal.groupBy({
            by: ["localizacao"],
            _count: { _all: true },
            where: {
                fazenda: {
                    idProprietario: BigInt(userId),
                },
            },
        });

        const animaisPorLocalizacao = animaisPorLocalizacaoRaw.map(a => ({
            label: a.localizacao ?? "Não informada",
            count: a._count._all,
        }));

        // ------------------ TIPO DE RAÇA ------------------
        const tipoRacaRaw = await prisma.animal.groupBy({
            by: ["tipoRaca"],
            _count: {_all: true},
            where: {
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            }
        });

        const tipoRaca = tipoRacaRaw.map(r => ({
            label: r.tipoRaca ?? "Desconhecida",
            count: r._count._all,
        }));

        // ------------------ ANIMAIS POR SEXO ------------------
        const animaisPorSexoRaw = await prisma.animal.groupBy({
            by: ["sexo"],
            _count: {_all: true},
            where: {
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            }
        });

        const mapSexo = {MACHO: 0, FEMEA: 0, TODOS: 0};
        animaisPorSexoRaw.forEach(s => {
            if (s.sexo === "MACHO") mapSexo.MACHO = s._count._all;
            else if (s.sexo === "FEMEA") mapSexo.FEMEA = s._count._all;
            else mapSexo.TODOS += s._count._all;
        });

        const animaisPorSexoFinal = [
            {sexo: "MACHO", count: mapSexo.MACHO},
            {sexo: "FEMEA", count: mapSexo.FEMEA},
            {sexo: "TODOS", count: mapSexo.TODOS},
        ];

        // ------------------ ANIMAIS DOENTES ------------------
        const animaisDoentes = await prisma.animal.count({
            where: {
                status: "DOENTE",
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            },
        });

        // ------------------ TAXA DE REPRODUÇÃO E TOTAL ANIMAIS ------------------
        const totalAnimais = await prisma.animal.count({
            where: {
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            }
        });
        const animaisReprodutivos = await prisma.animal.count({
            where: {
                status: "REPRODUZINDO",
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            },
        });

        // ------------------ TOTAL DE ANIMAIS COM REGISTRO -------------------
        const totalAnimaisComRegistro = await prisma.animal.count({
            where: {
                registro: {not: null},
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            },
        });

        // ------------------ TOTAL DE ANIMAIS VENDIDOS -------------------
        const totalAnimaisVendidos = await prisma.animal.count({
            where: {
                status: "VENDIDO",
                fazenda: {
                    idProprietario: BigInt(userId),
                }
            },
        });

        // ------------------ TOTAL DE FAZENDAS DO CRIADOR -------------------
        const totalFazendasDoCriador = await prisma.fazenda.count({
            where: {idProprietario: BigInt(userId)},
        });

        // ------------------ DOENÇAS ATIVAS POR FAZENDA ------------------
        interface DoencaAnimalRegistro {
            idDoenca: bigint | number | string;
            doenca?: { id: string | number; nome?: string } | null;
        }
        
        const doencasAtivasRegistros: DoencaAnimalRegistro[] = await (prisma as any).doencaAnimal.findMany({
            where: {
                AND: [
                    {
                        animal: {
                            fazenda: {
                                idProprietario: BigInt(userId),
                            },
                        },
                    },
                    {
                        OR: [
                            { emTratamento: true },
                            { dataFimTratamento: null },
                        ],
                    },
                ],
            },
            include: { doenca: true },
        });
        
        const doencasMap: Record<string, { doenca: any; count: number }> = {};
        doencasAtivasRegistros.forEach((r) => {
            const id = String(r.idDoenca);
            if (!doencasMap[id]) {
                doencasMap[id] = { doenca: r.doenca ?? { id: id, nome: 'Desconhecida' }, count: 0 };
            }
            doencasMap[id].count += 1;
        });
        
        const doencasPorFazenda = Object.values(doencasMap).sort((a, b) => b.count - a.count);
        const taxaReproducao = totalAnimais > 0
            ? Math.round((animaisReprodutivos / totalAnimais) * 100)
            : 0;

        res.json({
            vacinacoesPorMes,
            animaisPorLocalizacao,
            tipoRaca,
            animaisPorSexo: animaisPorSexoFinal,
            animaisDoentes,
            taxaReproducao,
            totalAnimais,
            totalAnimaisComRegistro,
            totalFazendasDoCriador,
            totalAnimaisVendidos,
            doencasPorFazenda
        });
    } catch (error) {
        next(error);
    }
};
