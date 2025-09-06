const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Criar usuário - rota POST /
router.post("/", async (req, res) => {
  try {
    const { cpf, nome, email, senha, dataNascimento, ativo } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: {
        cpf,
        nome,
        email,
        senha,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        ativo: ativo ?? true,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

module.exports = router;
