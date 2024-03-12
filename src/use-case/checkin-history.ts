import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkin-repositoy";

interface CheckInHistoryUseCaseReq{
    userId: string
    page: number
}

interface CheckInHistoryUseCaseRes {
    checkIns: CheckIn[]
}

export class CheckInHistoryUseCase{
    constructor(
        private checkInRepository: CheckInRepository
        ){}

    async execute({userId, page}: CheckInHistoryUseCaseReq): Promise<CheckInHistoryUseCaseRes>{
        const checkins = await this.checkInRepository.findUserCheckIns(userId, page)

        return {
            checkIns: checkins,
        }
    }
}