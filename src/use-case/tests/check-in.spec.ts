import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInRepositoryMemory } from '@/repositories/checkin-memory'
import { CheckInValidateUseCase } from '../checkin-validate'
import { ResourceNotFoundError } from '../erros/resource-not-found'

let rep: CheckInRepositoryMemory
let useCase: CheckInValidateUseCase


describe('tests check-in validate', () => {
    beforeEach(async () => {
        rep = new CheckInRepositoryMemory()
        useCase = new CheckInValidateUseCase(rep)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('create check-in', async () => {
        const checkCreate = await rep.create({
            userId: 'u-1',
            gymId: 'g-1'
        })

        const { checkIn } = await useCase.execute({ checkInId: checkCreate.id })

        expect(checkIn.validated_at).toBeDefined()
    })

    it('check-in not found', async () => {
        await expect(() =>
            useCase.execute({ checkInId: '01' })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('valid check-in time', async ()=>{
        vi.setSystemTime(new Date(2024, 2, 12, 8, 0))
        const checkCreate = await rep.create({
            userId: 'u-1',
            gymId: 'g-1'
        })

        vi.advanceTimersByTime(1000 * 60 * 20)
        // const { checkIn } = await useCase.execute({ checkInId: checkCreate.id })
        await expect(()=>useCase
            .execute({ checkInId: checkCreate.id }))
            .rejects.toBeInstanceOf(Error)

        // console.error(checkIn.validated_at)
      
    })
})