import { GymRepositoryPrisma } from "@/repositories/gym-prisma";
import { GymSearchUseCase } from "../gym-search";

export function gymSearchUseCaseFactory(){
    const gymRepository = new GymRepositoryPrisma()
    const useCase = new GymSearchUseCase(gymRepository)

    return useCase
}