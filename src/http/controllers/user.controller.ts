import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '@/use-case/register';
import { UserRepository } from '@/repositories/prisma-user-repository';

export async function createUser(request: FastifyRequest, reply: FastifyReply){
	
	const _register = new RegisterUseCase(new UserRepository());

	const schemaUser = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string()
	});

	const _user = schemaUser.parse(request.body);

	try {
		await _register.execute(_user);	
	} catch (error) {
		return reply.status(409).send();
	}

	return reply.status(201).send();
}