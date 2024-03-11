import { Prisma, User } from '@prisma/client';
import { UserRepository } from './user-repositoy-interface';

export class InMemoryRepository implements UserRepository{
    public items: User[] = []

    async create(data: Prisma.UserCreateInput)  {
        const _user = {
            id: '1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(_user)

        return _user
    }
    
    async findByEmail(email: string) {
        const _user = this.items.find(i => i.email==email)
        if(!_user){
            return null
        }

        return _user
    }

    async findById(id: string) {
        const user = this.items.find(i => i.id==id)
        if(!user){
            return null
        }

        return user
    }
}