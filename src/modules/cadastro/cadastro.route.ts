import "reflect-metadata";
import {Router} from "express";
import {container} from "tsyringe";
import {UsuarioService} from "../usuario/usuario.service";
import {FazendaService} from "../fazenda/fazenda.service";
import {AuthService} from "../auth/auth.service";
import bcrypt from "bcrypt";

const router = Router();
const usuarioService = container.resolve(UsuarioService);
const fazendaService = container.resolve(FazendaService);
const authService = container.resolve(AuthService);

router.post("/", async (req, res) => {
    try {
        const {cpf, nome, email, senha, dataNascimento, telefone, localizacao, urlImagem, fazenda} = req.body;

        if (!cpf || !nome || !email || !senha || !fazenda) {
            return res.status(400).json({message: "Campos obrigatórios faltando"});
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = await usuarioService.create({
            cpf,
            nome,
            email,
            senha: hashedPassword,
            dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
            ativo: true,
            telefone: telefone || "",
            localizacao: localizacao || "",
            urlImagem: urlImagem || "",
            resetPasswordToken: null,
            resetPasswordExpires: null
        });

        await fazendaService.create({
            ...req.body.fazenda,
            idProprietario: usuario.id,
            prefixo: req.body.fazenda?.prefixo === true,
            sufixo: req.body.fazenda?.sufixo === true,
            porte: req.body.fazenda?.porte
        });

        const loginPayload = await authService.login(email, senha);

        return res.status(201).json({
            message: "Cadastro realizado com sucesso!",
            ...loginPayload
        });
    } catch (err: any) {
        if (err.message.includes("Unique constraint failed")) {
            return res.status(409).json({message: "Email ou CPF já cadastrado."});
        }
        console.error("Erro no cadastro unificado:", err);
        return res.status(500).json({message: err.message || "Erro interno no servidor."});
    }
});

export default router;
