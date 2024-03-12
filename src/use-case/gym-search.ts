import { Gym, User } from "@prisma/client";
import { GymRepository } from "@/repositories/gym-repositoy";

interface GymSearchUseCaseReq{
    name: string,
    page: number
}

interface GymSearchUseCaseRes {
    gyms: Gym[]
}

export class GymSearchUseCase{
    constructor(private gymRepository: GymRepository){}

    async execute({name, page}: GymSearchUseCaseReq): Promise<GymSearchUseCaseRes>{
        const gyms = await this.gymRepository.search(name, page)

        return {
            gyms
        }
    }
}