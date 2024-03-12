import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findUniqueInData(userId: string, date: Date): Promise<CheckIn | null>
    findUserCheckIns(userId: string, page: number): Promise<CheckIn[] | []>
    countByUser(userId: string): Promise<number>    
}