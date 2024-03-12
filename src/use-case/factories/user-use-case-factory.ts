import { UserRepositoryPrisma } from "@/repositories/user-prisma";
import { UserUseCase } from "../user";

export function userUseCaseFactory(){
    const userRepository = new UserRepositoryPrisma()
    const userUseCase = new UserUseCase(userRepository);

    return userUseCase
}