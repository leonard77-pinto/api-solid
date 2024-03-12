import {beforeEach, describe, expect, it} from 'vitest'
import { AuthUseCase } from '../auth'
import { UserRepositoryMemory } from '@/repositories/user-memory'
import { hash } from 'bcryptjs'
import { UserNotExistError } from '../erros/user-not-exist-error'
import { UserRepository } from '@/repositories/user-repositoy'

let rep: UserRepository
let authUseCase: AuthUseCase

describe('tests use-case auth', ()=>{
    beforeEach(()=>{
        rep = new UserRepositoryMemory()
        authUseCase = new AuthUseCase(rep)
    })
        
    it('user auth', async ()=>{
        await rep.create({
            name: 'duke',
            email: 'duke@email.com',
            password_hash: await hash('123', 6)
        })

        const {user} = await authUseCase.execute({
            email: 'duke@email.com',
            password: '123'
        })

        expect(user.id).toBeTypeOf("string")
    })

    it('user auth invalid', async ()=>{
        await rep.create({
            name: 'duke',
            email: 'duke@email.com',
            password_hash: await hash('123', 6)
        })

        expect(()=>
            authUseCase.execute({
                email: 'duke@email.com',
                password: '4'
            })            
        ).rejects.toBeInstanceOf(UserNotExistError)
    })

})