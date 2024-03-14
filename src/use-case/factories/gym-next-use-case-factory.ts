import { GymRepositoryPrisma } from "@/repositories/gym-prisma";
import { GymNextUseCase } from "../gym-next";

export function gymNextUseCaseFactory(){
    const gymRepository = new GymRepositoryPrisma()
    const useCase = new GymNextUseCase(gymRepository)

    return useCase
}