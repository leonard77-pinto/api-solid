import { UserRepository } from "@/repositories/user-repositoy";
import { UserNotExistError } from "./erros/user-not-exist-error";
import { User } from "@prisma/client";

interface ProfileUseCaseReq{
    id: string,
}

interface ProfileUseCaseRes {
    user: User
}

export class ProfileUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({id}: ProfileUseCaseReq): Promise<ProfileUseCaseRes>{
        const user = await this.userRepository.findById(id)

        if(!user){
            throw new UserNotExistError()
        }

        return {
            user
        }
    }
}