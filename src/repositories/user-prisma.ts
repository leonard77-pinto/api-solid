import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UserRepository } from './user-repositoy';

export class UserRepositoryPrisma implements UserRepository{
	async findById(id: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
		const _userFind = await prisma.user.findUnique({
			where:{
				id
			}
		});

		return _userFind;
	}
	
	async findByEmail(email: string){
		const _userFind = await prisma.user.findUnique({
			where:{
				email
			}
		});

		return _userFind;
	}

	async create(data: Prisma.UserCreateInput){
		const _r = await prisma.user.create({
			data:{
				name: data.name,
				email: data.email,
				password_hash: data.password_hash
			}
		});    

		return _r;
	}

}