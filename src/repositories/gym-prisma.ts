import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { GymRepository, Location } from "./gym-repositoy";
import { prisma } from "@/lib/prisma";

export class GymRepositoryPrisma implements GymRepository{
    async findById(id: string): Promise<{ id: string; name: string; lati: Decimal; long: Decimal; } | null> {
        const data = await prisma.gym.findUnique({
            where:{
                id
            }
        })

        return data
    }

    async findNext({latitude, longitude}: Location) {
        const gyms = prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( lati ) ) * cos( radians( long ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( lati ) ) ) ) <= 10
        `

        return gyms
    }

    async create(data: Prisma.GymCreateInput): Promise<{ id: string; name: string; lati: Decimal; long: Decimal; }> {
        const dataCreated = await prisma.gym.create({
            data
        })

        return dataCreated
    }

    async search(name: string, page: number): Promise<{ id: string; name: string; lati: Decimal; long: Decimal; }[]> {
        const datas = await prisma.gym.findMany({
            where:{
                name:{
                    contains: name
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return datas
    }

}