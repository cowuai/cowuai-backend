import {inject, injectable} from "tsyringe";
import {AnimalService} from "../animal/animal.service";
import {FazendaService} from "../fazenda/fazenda.service";

@injectable()
export class PerfilService {
    constructor(
        @inject(AnimalService) private animalService: AnimalService,
        @inject(FazendaService) private fazendaService: FazendaService
    ) {}

    getProfileById = async (userId: bigint) => {
        const countAnimals = await this.animalService.countAnimalsByUserId(userId);
        const countFarms = await this.fazendaService.countFarmsByUserId(userId);

        return {
            totalAnimals: countAnimals,
            totalFarms: countFarms
        }
    }
}