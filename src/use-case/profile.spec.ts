import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory-repository'
import { hash } from 'bcryptjs'
import { UserNotExistError } from './erros/user-not-exist-error'
import { UserRepository } from '@/repositories/user-repositoy-interface'
import { ProfileUseCase } from './profile-use-case'

let rep: UserRepository
let profileUseCase: ProfileUseCase

describe('tests use-case profile', ()=>{
    beforeEach(()=>{
        rep = new InMemoryRepository()
        profileUseCase = new ProfileUseCase(rep)
    })
        
    it('user found', async ()=>{
        await rep.create({
            id: '1',
            name: 'duke',
            email: 'duke@email.com',
            password_hash: await hash('123', 6)
        })

        const {user} = await profileUseCase.execute({
            id: '1'
        })

        expect(user.id).toBeTypeOf("string")
    })

    it('user not found', async ()=>{
        await rep.create({
            name: 'duke',
            email: 'duke@email.com',
            password_hash: await hash('123', 6)
        })

        expect(()=>
            profileUseCase.execute({
                id: '4'
            })            
        ).rejects.toBeInstanceOf(UserNotExistError)
    })

})