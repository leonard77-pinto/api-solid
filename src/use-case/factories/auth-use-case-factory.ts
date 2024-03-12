import { UserRepositoryPrisma } from "@/repositories/user-prisma";
import { AuthUseCase } from "../auth";

export function authUseCaseFactory(){
    const userRepository = new UserRepositoryPrisma()
    const authUseCase = new AuthUseCase(userRepository);

    return authUseCase
}