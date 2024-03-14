import { CheckInRepositoryPrisma } from "@/repositories/check-in-prisma";
import { CheckInHistoryUseCase } from "../checkin-history";

export function checkInHistoryUseCaseFactory(){
    const checkinRepository = new CheckInRepositoryPrisma()
    const useCase = new CheckInHistoryUseCase(checkinRepository)

    return useCase
}