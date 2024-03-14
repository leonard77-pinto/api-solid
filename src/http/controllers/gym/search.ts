import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { gymSearchUseCaseFactory } from '@/use-case/factories/gym-search-use-case-factory';

export async function searchGym(request: FastifyRequest, reply: FastifyReply){
	
	const schemaParams = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1)
	});
	
	const {q, page} = schemaParams.parse(request.query);

	const useCase = gymSearchUseCaseFactory()

	const {gyms} = await useCase.execute({name:q, page});
	
	return reply.status(200).send(
		{
			gyms
		}
	);
}