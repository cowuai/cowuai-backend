import {container} from "tsyringe";
import {AuthService} from "../modules/auth/auth.service";
import {AuthController} from "../modules/auth/auth.controller";
import {UsuarioService} from "../modules/usuario/usuario.service";
import {UsuarioController} from "../modules/usuario/usuario.controller";
import {FazendaService} from "../modules/fazenda/fazenda.service";
import {FazendaController} from "../modules/fazenda/fazenda.controller";
import {TipoRacaService} from "../modules/tipoRaca/tipoRaca.service";
import {TipoRacaController} from "../modules/tipoRaca/tipoRaca.controller";
import {AnimalController} from "../modules/animal/animal.controller";
import {AnimalService} from "../modules/animal/animal.service";

// Auth
container.registerSingleton(AuthService, AuthService);
container.registerSingleton(AuthController, AuthController);

// Usuario
container.registerSingleton(UsuarioService, UsuarioService);
container.registerSingleton(UsuarioController, UsuarioController);

// Fazenda
container.registerSingleton(FazendaService, FazendaService);
container.registerSingleton(FazendaController, FazendaController);

// TipoRaca
container.registerSingleton(TipoRacaService, TipoRacaService);
container.registerSingleton(TipoRacaController, TipoRacaController);

// Animal
container.registerSingleton(AnimalService, AnimalService);
container.registerSingleton(AnimalController, AnimalController);