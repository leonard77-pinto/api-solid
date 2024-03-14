import { CheckInUseCase } from "../checkin";
import { CheckInRepositoryPrisma } from "@/repositories/check-in-prisma";
import { GymRepositoryPrisma } from "@/repositories/gym-prisma";

export function cheackInUseCaseFactory(){
    const checkinRepository = new CheckInRepositoryPrisma()
    const gymRepository = new GymRepositoryPrisma()
    const useCase = new CheckInUseCase(checkinRepository, gymRepository)

    return useCase
}