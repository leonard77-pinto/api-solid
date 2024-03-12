import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkin-repositoy";
import { GymRepository } from "@/repositories/gym-repositoy";
import { calculateDistance } from "@/utils/calculate-distance";

interface CheckInUseCaseReq{
    userId: string,
    gymId: string,
    lati: number,
    long: number
}

interface CheckInUseCaseRes {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(
        private checkInRepository: CheckInRepository,
        private gynRepository: GymRepository
        ){}

    async execute({userId, gymId, lati, long}: CheckInUseCaseReq): Promise<CheckInUseCaseRes>{
        const gym = await this.gynRepository.findById(gymId)
        if (!gym){
            throw new Error('gym not exists')
        }

        const distance = calculateDistance({latitude: lati, longitude: long}, {
            latitude: gym.lati.toNumber(), longitude: gym.long.toNumber()
        })

        if (distance > 0.1){
            throw new Error('distance')
        }

        const existsCheckIn = await this.checkInRepository.findUniqueInData(userId, new Date())

        if (existsCheckIn){
            throw new Error('check-in exists')
        }

        const checkIn = await this.checkInRepository.create({
            userId,
            gymId
        })

        return {
            checkIn
        }
    }
}