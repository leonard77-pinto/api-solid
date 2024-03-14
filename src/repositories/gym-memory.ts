import { Gym, Prisma } from '@prisma/client';
import { GymRepository, Location } from './gym-repositoy';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
import { calculateDistance } from '@/utils/calculate-distance';

export class GymRepositoryMemory implements GymRepository{
    items: Gym[] = []

    async findNext(location: Location){
        return this.items.filter((item)=>{
            const distance = calculateDistance({
                latitude: item.lati.toNumber(),
                longitude: item.long.toNumber()
            }, {
                latitude: location.latitude,
                longitude: location.longitude
            })

            return distance < 10
        })
    }

    async search(name: string, page: number){
        return this.items
            .filter(item => item.name.includes(name))
            .slice((page - 1) * 20, page * 20)
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            name: data.name,
            lati: new Decimal(data.lati.toString()),
            long: new Decimal(data.long.toString())
        }

        this.items.push(gym)

        return gym
    }

    async findById(id: string) {
        const gym = this.items.find(i => i.id===id)
        if(!gym){
            return null
        }

        return gym
    }
}