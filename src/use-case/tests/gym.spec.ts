import {beforeEach, describe, expect, it} from 'vitest'
import { GymRepositoryMemory } from '@/repositories/gym-memory'
import { GymUseCase } from '../gym'
import { GymSearchUseCase } from '../gym-search'

let repo: GymRepositoryMemory
let useCase: GymUseCase
let useCaseSearch: GymSearchUseCase

describe('tests use-case gym', ()=>{
    
    beforeEach(()=>{
        repo = new GymRepositoryMemory()
        useCase = new GymUseCase(repo)
        useCaseSearch = new GymSearchUseCase(repo)
    })
    
    it('gym create', async ()=>{
        const {gym} = await useCase.execute({
            name: 'gym-a',
            lati: 100,
            long: 200
        })

        expect(gym.id).toBeTypeOf("string")
    })

    it('gym search pagination', async ()=>{        
        for (let index = 1; index <= 42; index++) {
            await repo.create({
                name: `gym-${index}`,
                lati: 0,
                long: 0
            })
        }
        
        const {gyms} = await useCaseSearch.execute({
            name: 'gym',
            page: 2
        })
        
        expect(gyms).toHaveLength(20)
    })

})