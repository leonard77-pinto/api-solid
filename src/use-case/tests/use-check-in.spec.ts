import { beforeEach, describe, expect, it} from 'vitest'
import { CheckInRepositoryMemory } from '@/repositories/checkin-memory'
import { UserCheackInUseCase } from '../user-checkin'

let useCase: UserCheackInUseCase
let rep: CheckInRepositoryMemory

describe('Checkins metrics', ()=>{
    beforeEach(async ()=>{
        rep = new CheckInRepositoryMemory()
        useCase = new UserCheackInUseCase(rep)
    })
        
    it('check-in count', async ()=>{        
        await rep.create({
            userId: '1',
            gymId: '1'
        })

        await rep.create({
            userId: '1',
            gymId: '2'
        })

        const {checkins} = await useCase.execute({
            userId: '1'
        })
        
        expect(checkins).toEqual(2)
    })
})