import { Gym, User } from "@prisma/client";
import { GymRepository } from "@/repositories/gym-repositoy";

interface GymUseCaseReq{
    name: string,
    lati: number,
    long: number
}

interface GymUseCaseRes {
    gym: Gym
}

export class GymUseCase{
    constructor(private gymRepository: GymRepository){}

    async execute({name, lati, long}: GymUseCaseReq): Promise<GymUseCaseRes>{
        const gym = await this.gymRepository.create({
            name: name,
            lati: lati,
            long: long
        })

        return {
            gym
        }
    }
}