import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { checkInHistoryUseCaseFactory } from '@/use-case/factories/check-in-history-use-case-factory';

export async function historyCheckIn(request: FastifyRequest, reply: FastifyReply){
	
	const schemaParams = z.object({
		page: z.coerce.number().min(1).default(1)
	});
	
	const {page} = schemaParams.parse(request.query);

	const useCase = checkInHistoryUseCaseFactory()

	const {checkIns} = await useCase.execute({page, userId: request.user.sub});
	
	return reply.status(200).send(
		checkIns
	);
}