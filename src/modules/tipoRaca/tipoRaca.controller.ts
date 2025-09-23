import {inject} from "tsyringe";

export class TipoRacaController {
    constructor(
        @inject("TipoRacaService") private tipoRacaService: any
    ) {
    }
}