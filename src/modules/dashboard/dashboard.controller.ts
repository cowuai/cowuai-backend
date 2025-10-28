import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // VACINAÇÕES POR MÊS
    const vacinacoesPorMesRaw = await prisma.vacinaAplicada.groupBy({
      by: ["dataAplicacao"],
      _count: { id: true },
    });

    const vacinacoesPorMes = vacinacoesPorMesRaw.map(v => ({
      label: new Date(v.dataAplicacao).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      }),
      count: v._count.id,
    }));

    // ANIMAIS POR LOCALIZAÇÃO
    const animaisPorLocalizacaoRaw = await prisma.animal.groupBy({
      by: ["localizacao"],
      _count: { id: true },
    });

    const animaisPorLocalizacao = animaisPorLocalizacaoRaw.map(a => ({
      label: a.localizacao ?? "Não informada",
      count: a._count.id,
    }));

    // TIPO DE RAÇA
    const tipoRacaRaw = await prisma.animal.groupBy({
      by: ["tipoRaca"],
      _count: { id: true },
    });

    const tipoRaca = tipoRacaRaw.map(r => ({
      label: r.tipoRaca ?? "Desconhecida",
      count: r._count.id,
    }));

    // ANIMAIS POR SEXO
    const animaisPorSexoRaw = await prisma.animal.groupBy({
      by: ["sexo"],
      _count: { id: true },
    });

    const animaisPorSexo = animaisPorSexoRaw.map(s => ({
      sexo: s.sexo ?? "Não informado",
      count: s._count.id,
    }));

    // ANIMAIS DOENTES
    const animaisDoentes = await prisma.animal.count({
      where: { status: "DOENTE" },
    });

    // TAXA DE REPRODUÇÃO
    const totalAnimais = await prisma.animal.count();
    const animaisReprodutivos = await prisma.animal.count({
      where: { status: "REPRODUZINDO" },
    });

    const taxaReproducao =
      totalAnimais > 0
        ? Math.round((animaisReprodutivos / totalAnimais) * 100)
        : 0;

    res.json({
      vacinacoesPorMes,
      animaisPorLocalizacao,
      tipoRaca,
      animaisPorSexo,
      animaisDoentes,
      taxaReproducao,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
