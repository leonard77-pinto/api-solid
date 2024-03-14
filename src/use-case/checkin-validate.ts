import { CheckInRepository } from "@/repositories/checkin-repositoy";
import { ResourceNotFoundError } from "./erros/resource-not-found";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

interface CheckInValidateUseCaseReq{
    checkInId: string
}

interface CheckInValidateUseCaseRes {
    checkIn: CheckIn
}

export class CheckInValidateUseCase{
    constructor(
        private checkInRepository: CheckInRepository
        ){}

    async execute({checkInId}: CheckInValidateUseCaseReq): Promise<CheckInValidateUseCaseRes>{
        const check = await this.checkInRepository.findById(checkInId)

        if (check===null){
            throw new ResourceNotFoundError()
        }

        if (dayjs(new Date()).diff(check.created_at, 'minutes') >= 20) {
            throw new Error('Time expired!')
        }

        check.validated_at = new Date()
        
        await this.checkInRepository.save(check)

        return {
            checkIn: check
        }
    }
}