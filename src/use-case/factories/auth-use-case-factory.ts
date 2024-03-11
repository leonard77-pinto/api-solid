import { UserRepositoryPrimsa } from "@/repositories/prisma-user-repository";
import { AuthUseCase } from "../auth";

export function authUseCaseFactory(){
    const userRepository = new UserRepositoryPrimsa()
    const authUseCase = new AuthUseCase(userRepository);

    return authUseCase
}