import { beforeEach, describe, expect, it} from 'vitest'
import { CheckInRepositoryMemory } from '@/repositories/checkin-memory'
import { CheckInHistoryUseCase } from '../checkin-history'

let useCase: CheckInHistoryUseCase
let rep: CheckInRepositoryMemory

describe('test user checkIns', ()=>{
    beforeEach(async ()=>{
        rep = new CheckInRepositoryMemory()
        useCase = new CheckInHistoryUseCase(rep)
    })
        
    it('check-in history', async ()=>{        
        await rep.create({
            userId: '1',
            gymId: '1'
        })

        await rep.create({
            userId: '1',
            gymId: '2'
        })

        const {checkIns} = await useCase.execute({
            userId: '1',
            page: 1
        })
        
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gymId: '1'}),
            expect.objectContaining({gymId: '2'})
        ])
    })
    
    it('check-in history pagination', async ()=>{        
        for (let index = 1; index <= 42; index++) {
            await rep.create({
                userId: '1',
                gymId: `${index}`
            })
        }
        
        const {checkIns} = await useCase.execute({
            userId: '1',
            page: 3
        })
        
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gymId: '41'}),
            expect.objectContaining({gymId: '42'})
        ])

    })
})