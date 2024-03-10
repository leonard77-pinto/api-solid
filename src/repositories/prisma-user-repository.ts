import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { IRepositoryUser } from './user-repositoy-interface';

export class UserRepository implements IRepositoryUser{
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