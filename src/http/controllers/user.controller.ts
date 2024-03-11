import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { EmailExistError } from '@/use-case/erros/email-exist-error';
import { userUseCaseFactory } from '@/use-case/factories/user-use-case-factory';

export async function createUser(request: FastifyRequest, reply: FastifyReply){
	
	const _register = userUseCaseFactory()

	const schemaUser = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string()
	});
	
	const _user = schemaUser.parse(request.body);

	try {
		await _register.execute(_user);
	} catch (error){
		if (error instanceof EmailExistError){
			return reply.status(409).send({
				message: error.message
			});
		}

		throw error
	}

	return reply.status(201).send();
}