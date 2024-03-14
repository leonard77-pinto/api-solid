import { UserRepositoryPrisma } from "@/repositories/user-prisma";
import { ProfileUseCase } from "../profile";

export function ProfileUseCaseUseCaseFactory(){
    const userRepository = new UserRepositoryPrisma()
    const useCase = new ProfileUseCase(userRepository);

    return useCase
}