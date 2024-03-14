import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from 'zod';
import { checkInValidateUseCaseFactory } from '@/use-case/factories/check-in-vaidate-use-case-factory';

export async function validateCheckIn(request: FastifyRequest, reply: FastifyReply){
	const params = z.object({
		checkInId: z.string()
	});
	
		
	const useCase = checkInValidateUseCaseFactory()
	
	const {checkInId} = params.parse(request.params);
	
	const {checkIn} = await useCase.execute({checkInId});
	
	return reply.status(204).send({checkIn});
}