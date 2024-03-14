import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { cheackInUseCaseFactory } from '@/use-case/factories/check-in-use-case-factory';

export async function createCheckIn(request: FastifyRequest, reply: FastifyReply){
	const params = z.object({
		gymId: z.string()
	});
	
	
	const schema = z.object({
		lati: z.number(),
		long: z.number()
	});
	
	const useCase = cheackInUseCaseFactory()
	
	const {gymId} = params.parse(request.params);
	const {lati, long} = schema.parse(request.body);

	await useCase.execute({gymId, userId: request.user.sub, lati, long});
	
	return reply.status(201).send();
}