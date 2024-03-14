import { CheckInRepositoryPrisma } from "@/repositories/check-in-prisma";
import { CheckInValidateUseCase } from "../checkin-validate";

export function checkInValidateUseCaseFactory(){
    const checkinRepository = new CheckInRepositoryPrisma()
    const useCase = new CheckInValidateUseCase(checkinRepository)

    return useCase
}