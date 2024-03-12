import { CheckInRepository } from "@/repositories/checkin-repositoy";

interface UserCheackInUseCaseReq{
    userId: string
}

interface UserCheackInUseCaseRes {
    checkins: number
}

export class UserCheackInUseCase{
    constructor(
        private checkInRepository: CheckInRepository
        ){}

    async execute({userId}: UserCheackInUseCaseReq): Promise<UserCheackInUseCaseRes>{
        const checkins = await this.checkInRepository.countByUser(userId)

        return {
            checkins,
        }
    }
}