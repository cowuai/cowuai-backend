import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {jwtConfig} from "../../config/jwt";
import {UsuarioService} from "../usuario/usuario.service";
import {inject, injectable} from "tsyringe";

@injectable()
export class AuthService {
    constructor(@inject(UsuarioService) private usuarioService: UsuarioService) {}

    async login(email: string, password: string) {
        const user = await this.usuarioService.findByEmail(email);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expiresIn}
        );

        return {token, user};
    }
}
