import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { registerUseCase } from '@/use-case/register';

export async function createUser(request: FastifyRequest, reply: FastifyReply){
	const schemaUser = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string()
	});

	const _user = schemaUser.parse(request.body);

	try {
		registerUseCase(_user);	
	} catch (error) {
		return reply.status(409).send();
	}

	return reply.status(201).send();
}