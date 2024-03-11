import { CheckIn, Prisma} from '@prisma/client';
import { CheckInRepository } from './checkin-repositoy-interface';
import { randomUUID } from 'crypto';

export class CheckInMemoryRepository implements CheckInRepository{
    public items: CheckIn[] = []
    
    async findUniqueInData(userId: string, date: Date) {
        const checkIn = this.items.find(i => i.userId == userId)

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