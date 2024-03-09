import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class UserRepository{
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

	async findbyEmail(email: string){
		const _userFind = await prisma.user.findUnique({
			where:{
				email
			}
		});

		return _userFind;
	}
}