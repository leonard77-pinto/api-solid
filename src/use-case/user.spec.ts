import {describe, expect, it} from 'vitest'
import { UserUseCase } from './user'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory-repository'
import { EmailExistError } from './erros/email-exist-error'

describe('tests use-case user', ()=>{
    it('user register', async ()=>{
        const repo = new InMemoryRepository()
        const register = new UserUseCase(repo)

        const _u = await register.execute({
            name: 'duke',
            email: 'duke@email.com',
            password: '123'
        })

        expect(_u.user.id).toBeTypeOf("string")
    })

    it('password hash', async ()=>{
        const repo = new InMemoryRepository()
        const register = new UserUseCase(repo)

        const _u = await register.execute({
            name: 'duke',
            email: 'duke@email.com',
            password: '123'
        })

        const _c = await compare('123', _u.user.password_hash)
        expect(_c).toBe(true)
    })

    it('valid email unique', async ()=>{
        const repo = new InMemoryRepository()
        const register = new UserUseCase(repo)

        await register.execute({
            name: 'duke',
            email: 'duke@email.com',
            password: '123'
        })

        await expect(() =>
            register.execute({
                name: 'duke',
                email: 'duke@email.com',
                password: '123'
            })
        ).rejects.toBeInstanceOf(EmailExistError)
        
    })
})