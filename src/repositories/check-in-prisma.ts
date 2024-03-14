import { Prisma } from "@prisma/client";
import { CheckInRepository } from "./checkin-repositoy";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class CheckInRepositoryPrisma implements CheckInRepository{
    async create(data: Prisma.CheckInUncheckedCreateInput){
        const dataCreated = prisma.checkIn.create({
            data,
        })

        return dataCreated
    }

    async findUniqueInData(userId: string, date: Date){
        const start = dayjs(date).startOf('date')
        const end = dayjs(date).endOf('date')

        const data = prisma.checkIn.findFirst({
            where:{
                userId,
                created_at: {
                    gte: start.toDate(),
                    lte: end.toDate()
                }
            }
        })

        return data
    }

    async findUserCheckIns(userId: string, page: number){
        const datas = await prisma.checkIn.findMany({
            where:{
                userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return datas
    }

    async countByUser(userId: string){
        const value = prisma.checkIn.count({
            where:{
                userId
            }
        })

        return value
    }

    async findById(id: string){
        const data = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return data
    }

    async save(checkin: { id: string; created_at: Date; validated_at: Date | null; userId: string; gymId: string; }){
        const data = await prisma.checkIn.update({
            where:{
                id: checkin.id
            },
            data: checkin
        })

        return data
    }

}