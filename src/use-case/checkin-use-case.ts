import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkin-repositoy-interface";

interface CheckInUseCaseReq{
    userId: string,
    gymId: string
}

interface CheckInUseCaseRes {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(private checkInRepository: CheckInRepository){}

    async execute({userId, gymId}: CheckInUseCaseReq): Promise<CheckInUseCaseRes>{
        
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