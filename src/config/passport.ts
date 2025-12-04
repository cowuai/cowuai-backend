import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { container } from "tsyringe";
import { UsuarioService } from "../modules/usuario/usuario.service";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
        },
        async (accessToken,UB, profile, done) => {
            try {
                const usuarioService = container.resolve(UsuarioService);
                const email = profile.emails?.[0].value;
                const googleId = profile.id;

                if (!email) {
                    return done(new Error("O e-mail não foi fornecido pelo Google."));
                }

                // 1. Verifica se usuário já existe pelo Google ID
                let user = await usuarioService.findByGoogleId(googleId);

                // 2. Se não existe pelo ID, verifica pelo E-mail (caso ele já tenha conta normal)
                if (!user) {
                    user = await usuarioService.findByEmail(email);

                    if (user) {
                            // Usuário existe, vamos vincular o Google ID a ele
                            user = await usuarioService.update(user.id, { googleId } as any);
                        } else {
                            // 3. Usuário não existe, vamos criar
                            user = await usuarioService.create({
                                nome: profile.displayName || "Usuário Google",
                                email: email,
                                googleId: googleId,
                                ativo: true,
                                cpf: "",
                                senha: "",
                                urlImagem: profile.photos?.[0]?.value || "",
                            } as any);
                        }
                }

                return done(null, user);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);

export default passport;