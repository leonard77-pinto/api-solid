import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findUniqueInData(userId: string, date: Date): Promise<CheckIn | null>
}