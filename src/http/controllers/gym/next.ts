import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { gymNextUseCaseFactory } from '@/use-case/factories/gym-next-use-case-factory';

export async function nextGym(request: FastifyRequest, reply: FastifyReply){
	
	const schemaParams = z.object({
		userLatitude: z.coerce.number(),
		userLongitude: z.coerce.number(),
	});
	
	const {userLatitude, userLongitude} = schemaParams.parse(request.query);

	const useCase = gymNextUseCaseFactory()

	const {gyms} = await useCase.execute({userLatitude, userLongitude});
	
	return reply.status(200).send({
		gyms
	}
	);
}