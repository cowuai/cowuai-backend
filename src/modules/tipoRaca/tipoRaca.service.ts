import {TipoRaca} from "@prisma/client";
import {injectable} from "tsyringe";

@injectable()
export class TipoRacaService {
    findAll = () => {
        return Object.values(TipoRaca);
    }
}