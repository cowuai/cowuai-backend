import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { UsuarioService } from "../modules/usuario/usuario.service";
import { FazendaService } from "../modules/fazenda/fazenda.service";
import jwt from "jsonwebtoken";

const router = Router();
const usuarioService = container.resolve(UsuarioService);
const fazendaService = container.resolve(FazendaService);

router.post("/", async (req, res) => {
  try {
    // 1️⃣ Criar usuário
    const usuario = await usuarioService.create({
      ...req.body,
      dataNascimento: req.body.dataNascimento
        ? new Date(req.body.dataNascimento)
        : null,
    });

    // 2️⃣ Criar fazenda vinculada
    const fazenda = await fazendaService.create({
      ...req.body.fazenda,
      idProprietario: usuario.id,
      prefixo: req.body.fazenda?.prefixo === true, // booleano direto
      sufixo: req.body.fazenda?.sufixo === true,   // booleano direto
      porte: req.body.fazenda?.porte, // string do enum Porte
    });

    // 3️⃣ Gerar token JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não definido no .env");
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4️⃣ Retornar usuário, fazenda e token
    return res.status(201).json({ usuario, fazenda, token });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ message: err.message || "Erro ao cadastrar usuário/fazenda" });
  }
});

export default router;
