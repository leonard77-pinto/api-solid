import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { gymUseCaseFactory } from '@/use-case/factories/gym-use-case-factory';

export async function createGym(request: FastifyRequest, reply: FastifyReply){
	
	const useCase = gymUseCaseFactory()

	const schemaGym = z.object({
		name: z.string(),
		lati: z.number(),
		long: z.number()
	});
	
	const data = schemaGym.parse(request.body);

	await useCase.execute(data);
	
	return reply.status(201).send();
}