import { CheckIn, Prisma} from '@prisma/client';
import { CheckInRepository } from './checkin-repositoy';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

export class CheckInRepositoryMemory implements CheckInRepository{
    public items: CheckIn[] = []

    async save(checkin: CheckIn) {
        const index = this.items.findIndex(i => i.id===checkin.id)
        
        if (index >= 0){
            this.items[index] = checkin
        }

        return checkin
    }

    async findById(id: string){
        const check = this.items.find(item => item.id === id)

        if(!check){
            return null
        }
        
        return check
    }

    async countByUser(userId: string){
        return this.items
            .filter(item => item.userId===userId)
            .length
    }

    async findUserCheckIns(userId: string, page: number){
        return this.items
            .filter(item => item.userId===userId)
            .slice((page - 1) * 20, page * 20 )
    }

    async findUniqueInData(userId: string, date: Date) {
        
        const dateStart = dayjs(date).startOf('date')
        const dateEnd = dayjs(date).endOf('date')

        const checkIn = this.items.find((i) => {
            const _d = dayjs(i.created_at)
            const _v = _d.isAfter(dateStart) && _d.isBefore(dateEnd)
            return i.userId === userId && _v
        })

        if (!checkIn) {
            return null
        }

        return checkIn
    }
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const c = {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            validated_at: data.validated_at ? new Date(data.validated_at): null,
            created_at: new Date()
        }

        this.items.push(c)

        return c
    }
}