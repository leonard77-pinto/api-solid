import {beforeEach, describe, expect, it} from 'vitest'
import { GymRepositoryMemory } from '@/repositories/gym-memory'
import { GymNextUseCase } from '../gym-next'

let repo: GymRepositoryMemory
let useCase: GymNextUseCase

describe('use-case gym-next', ()=>{
    
    beforeEach(async ()=>{
        repo = new GymRepositoryMemory()
        useCase = new GymNextUseCase(repo)

        await repo.create({
            name: 'gym-1',
            lati: 0,
            long: 0
        })

        await repo.create({
            name: 'gym-2',
            lati: 0,
            long: 0
        })

    })
    
    it('gym-next found', async ()=>{
       const {gyms} = await useCase.execute({
        userLatitude: 0,
        userLongitude: 0
       })

       expect(gyms).toHaveLength(2)

    })
})