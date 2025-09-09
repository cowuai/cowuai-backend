const express = require("express");
const { PrismaClient } = require("@prisma/client");

// Importa a rota de usuário
const usuarioRoutes = require("./usuarioRoutes");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Verifica se a conexão com o banco de dados está ok
app.get("/", async (req, res) => {
  try {
    await prisma.$connect();
    res.send("CowUai Backend funcionando 🚀 e banco de dados conectado! ✅");
  } catch (error) {
    res
      .status(500)
      .send("CowUai Backend funcionando, mas com erro no banco de dados. ❌");
  }
});

// Usa a rota de usuário para o caminho '/usuarios'
app.use("/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
