import { Request, Response } from "express"; 
import { prisma } from "../../config/prisma";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // ------------------ VACINAÇÕES POR MÊS ------------------
    const vacinacoes = await prisma.vacinaAplicada.findMany({
      select: { dataAplicacao: true },
    });

    const vacinacoesPorMesMap: Record<string, number> = {};
    vacinacoes.forEach(v => {
      const key = new Date(v.dataAplicacao).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      });
      vacinacoesPorMesMap[key] = (vacinacoesPorMesMap[key] || 0) + 1;
    });

    const vacinacoesPorMes = Object.entries(vacinacoesPorMesMap).map(([label, count]) => ({ label, count }));

    // ------------------ ANIMAIS POR LOCALIZAÇÃO ------------------
    const animaisPorLocalizacaoRaw = await prisma.animal.groupBy({
      by: ["localizacao"],
      _count: { id: true },
    });

    const animaisPorLocalizacao = animaisPorLocalizacaoRaw.map(a => ({
      label: a.localizacao ?? "Não informada",
      count: a._count.id,
    }));

    // ------------------ TIPO DE RAÇA ------------------
    const tipoRacaRaw = await prisma.animal.groupBy({
      by: ["tipoRaca"],
      _count: { id: true },
    });

    const tipoRaca = tipoRacaRaw.map(r => ({
      label: r.tipoRaca ?? "Desconhecida",
      count: r._count.id,
    }));

    // ------------------ ANIMAIS POR SEXO ------------------
    const animaisPorSexoRaw = await prisma.animal.groupBy({
      by: ["sexo"],
      _count: { id: true },
    });

    const mapSexo = { MACHO: 0, FEMEA: 0, TODOS: 0 };
    animaisPorSexoRaw.forEach(s => {
      if (s.sexo === "MACHO") mapSexo.MACHO = s._count.id;
      else if (s.sexo === "FEMEA") mapSexo.FEMEA = s._count.id;
      else mapSexo.TODOS += s._count.id;
    });

    const animaisPorSexoFinal = [
      { sexo: "MACHO", count: mapSexo.MACHO },
      { sexo: "FEMEA", count: mapSexo.FEMEA },
      { sexo: "TODOS", count: mapSexo.TODOS },
    ];

    // ------------------ ANIMAIS DOENTES ------------------
    const animaisDoentes = await prisma.animal.count({
      where: { status: "DOENTE" },
    });

    // ------------------ TAXA DE REPRODUÇÃO ------------------
    const totalAnimais = await prisma.animal.count();
    const animaisReprodutivos = await prisma.animal.count({
      where: { status: "REPRODUZINDO" },
    });

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
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
