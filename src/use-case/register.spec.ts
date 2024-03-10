import {describe, expect, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory-repository'
import { EmailExistError } from './erros/email-exist-error'

describe('register user', ()=>{
    it('user register', async ()=>{
        const repo = new InMemoryRepository()
        const register = new RegisterUseCase(repo)

        const _u = await register.execute({
            name: 'duke',
            email: 'duke@email.com',
            password: '123'
        })

        expect(_u.user.id).toBeTypeOf("string")
    })

    it('password hash', async ()=>{
        const repo = new InMemoryRepository()
        const register = new RegisterUseCase(repo)

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
        const register = new RegisterUseCase(repo)

        // await register.execute({
        //     name: 'duke',
        //     email: 'duke@email.com',
        //     password: '123'
        // })
        
        //console.log(repo.findByEmail('duke@email.com'))

        await register.execute({
            name: 'duke',
            email: 'duke@email.com',
            password: '123'
        })

        expect(() =>
            register.execute({
                name: 'duke',
                email: 'duke@email.com',
                password: '123'
            })
        ).rejects.toBeInstanceOf(EmailExistError)
        
    })
})