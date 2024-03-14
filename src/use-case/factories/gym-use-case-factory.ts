import { GymRepositoryPrisma } from "@/repositories/gym-prisma";
import { GymUseCase } from "../gym";

export function gymUseCaseFactory(){
    const gymRepository = new GymRepositoryPrisma()
    const useCase = new GymUseCase(gymRepository)

    return useCase
}