import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUse{
    name: string
    email: string
    password: string
}

export async function registerUseCase(u: RegisterUse){
	const _userFind = await prisma.user.findUnique({
		where:{
			email: u.email
		}
	});

	if(_userFind){
		throw new Error('Email in use.');
	}

	const _hash = await hash(u.password, 6);

	await prisma.user.create({
		data:{
			name: u.name,
			email: u.email,
			password_hash: _hash
		}
	});

}