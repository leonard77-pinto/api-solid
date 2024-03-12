import { Gym } from "@prisma/client";
import { GymRepository } from "@/repositories/gym-repositoy";

interface GymNextUseCaseReq{
    userLatitude: number
    userLongitude: number
}

interface GymNextUseCaseRes {
    gyms: Gym[]
}

export class GymNextUseCase{
    constructor(private gymRepository: GymRepository){}

    async execute({userLatitude, userLongitude}: GymNextUseCaseReq): Promise<GymNextUseCaseRes>{
        const gyms = await this.gymRepository.findNext({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms
        }
    }
}