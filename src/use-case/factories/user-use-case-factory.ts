import { UserRepositoryPrimsa } from "@/repositories/prisma-user-repository";
import { UserUseCase } from "../user";

export function userUseCaseFactory(){
    const userRepository = new UserRepositoryPrimsa()
    const userUseCase = new UserUseCase(userRepository);

    return userUseCase
}