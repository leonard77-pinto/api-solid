import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { UserNotExistError } from '@/use-case/erros/user-not-exist-error';
import { authUseCaseFactory } from '@/use-case/factories/auth-use-case-factory';

export async function authUser(request: FastifyRequest, reply: FastifyReply){
	
	const _register = authUseCaseFactory()

	const schemaUser = z.object({
		email: z.string().email(),
		password: z.string()
	});
	
	const _user = schemaUser.parse(request.body);

	try {
		await _register.execute(_user);
	} catch (error){
		if (error instanceof UserNotExistError){
			return reply.status(400).send({
				message: error.message
			});
		}

		throw error
	}

	return reply.status(200).send();
}