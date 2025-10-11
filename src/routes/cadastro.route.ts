import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { UsuarioService } from "../modules/usuario/usuario.service";
import { FazendaService } from "../modules/fazenda/fazenda.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Importe o bcrypt aqui

const router = Router();
const usuarioService = container.resolve(UsuarioService);
const fazendaService = container.resolve(FazendaService);

router.post("/", async (req, res) => {
  try {
    const { senha, ...restOfBody } = req.body;

    // Criptografe a senha antes de criar o usuário
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 1️⃣ Criar usuário com a senha criptografada
    const usuario = await usuarioService.create({
      ...restOfBody,
      senha: hashedPassword, // Passe a senha já criptografada
      dataNascimento: restOfBody.dataNascimento
        ? new Date(restOfBody.dataNascimento)
        : null,
    });

    // 2️⃣ Criar fazenda vinculada
    const fazenda = await fazendaService.create({
      ...req.body.fazenda,
      idProprietario: usuario.id,
      prefixo: req.body.fazenda?.prefixo === true,
      sufixo: req.body.fazenda?.sufixo === true,
      porte: req.body.fazenda?.porte,
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