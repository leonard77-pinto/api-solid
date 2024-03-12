import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { CheckInUseCase } from '../checkin'
import { CheckInRepositoryMemory } from '@/repositories/checkin-memory'
import { GymRepositoryMemory } from '@/repositories/gym-memory'
import { Decimal } from '@prisma/client/runtime/library'

let rep: CheckInRepositoryMemory
let repGym: GymRepositoryMemory
let useCase: CheckInUseCase

const _lati= -19.9154784
const _long= -43.9532056

describe('tests checkIn', ()=>{
    beforeEach(async ()=>{
        rep = new CheckInRepositoryMemory()
        repGym = new GymRepositoryMemory()
        useCase = new CheckInUseCase(rep, repGym)
        
        await repGym.create({
            id: '1',
            name: 'gym-1',
            lati: _lati,
            long: _long
        })
        
        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })
        
    it('create check-in', async ()=>{                
        const {checkIn} = await useCase.execute({
            userId: '1',
            gymId: '1',
            lati: _lati,
            long: _long
        })
        
        expect(checkIn.id).toBeTypeOf("string")
    })

    it('unique check-in day', async ()=>{        
        vi.setSystemTime(new Date(2000, 0, 31, 8, 0, 0))

        const {checkIn} = await useCase.execute({
            userId: '1',
            gymId: '1',
            lati: _lati,
            long: _long

        })

        await expect(() =>
            useCase.execute({
                userId: '1',
                gymId: '1',
                lati: _lati,
                long: _long
        
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('check-in diferent days', async ()=>{        
        vi.setSystemTime(new Date(2000, 0, 31, 8, 0, 0))

        await useCase.execute({
            userId: '1',
            gymId: '1',
            lati: _lati,
            long: _long

        })

        vi.setSystemTime(new Date(2000, 1, 1, 8, 0, 0))

        const {checkIn} = await useCase.execute({
            userId: '1',
            gymId: '1',
            lati: _lati,
            long: _long
        })
        
        expect(checkIn.id).toBeTypeOf("string")

    })
    
    it('validate check-in distance', async ()=>{
        repGym.items.push({
            id: '2',
            name: 'gym-2',
            lati: new Decimal(-19.9260519),
            long: new Decimal(-43.9536777)
        })

        await expect(()=>
        useCase.execute({
            userId: '1',
            gymId: '2',
            lati: _lati,
            long: _long
        })).rejects.toBeInstanceOf(Error)
        
    })

})