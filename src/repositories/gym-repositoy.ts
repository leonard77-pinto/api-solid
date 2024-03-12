import { Gym, Prisma } from "@prisma/client";

export interface Location{
    latitude: number
    longitude: number
}

export interface GymRepository{
    findById(id: string): Promise<Gym | null>
    findNext(location: Location): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    search(name: string, page: number): Promise<Gym[]>
}