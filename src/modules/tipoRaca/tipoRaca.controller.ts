import {inject, injectable} from "tsyringe";
import {TipoRacaService} from "./tipoRaca.service";

@injectable()
export class TipoRacaController {
    constructor(
        @inject(TipoRacaService) private tipoRacaService: TipoRacaService
    ) {}

    findAll = () => {
        return this.tipoRacaService.findAll();
    }
}