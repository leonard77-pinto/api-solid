import { UserRepository } from "@/repositories/user-repositoy";
import { UserNotExistError } from "./erros/user-not-exist-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
//import { type } from "os";

interface AuthUseCaseReq{
    email: string,
    password: string
}

interface AuthUseCaseRes {
    user: User
}

export class AuthUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({email, password}: AuthUseCaseReq): Promise<AuthUseCaseRes>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new UserNotExistError()
        }

        const isValidPassword = await compare(password, user.password_hash)

        if(!isValidPassword){
            throw new UserNotExistError()
        }

        return {
            user
        }
    }
}