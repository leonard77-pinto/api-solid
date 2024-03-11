import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { CheckInRepository } from '@/repositories/checkin-repositoy-interface'
import { CheckInUseCase } from './checkin-use-case'
import { CheckInMemoryRepository } from '@/repositories/checkin-memory-repository'

let rep: CheckInRepository
let useCase: CheckInUseCase

describe('tests checkIn', ()=>{
    beforeEach(()=>{
        rep = new CheckInMemoryRepository()
        useCase = new CheckInUseCase(rep)

        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })
        
    it('create check-in', async ()=>{
        const {checkIn} = await useCase.execute({
            userId: '1',
            gymId: '1'
        })
        
        expect(checkIn.id).toBeTypeOf("string")
    })

    it('unique check-in day', async ()=>{
        
        vi.setSystemTime(new Date(2000, 0, 31, 8, 0, 0))

        const {checkIn} = await useCase.execute({
            userId: '1',
            gymId: '1'
        })

        await expect(() =>
            useCase.execute({
                userId: '1',
                gymId: '1'
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('check-in diferent days', async ()=>{
        
        vi.setSystemTime(new Date(2000, 0, 31, 8, 0, 0))

        await useCase.execute({
            userId: '1',
            gymId: '1'
        })

        vi.setSystemTime(new Date(2000, 1, 1, 8, 0, 0))

        const {checkIn} = await useCase.execute({
            userId: '1',
            gymId: '1'
        })
        
        expect(checkIn.id).toBeTypeOf("string")

    })

})