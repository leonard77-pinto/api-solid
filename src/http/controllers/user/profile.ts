import { ProfileUseCaseUseCaseFactory } from '@/use-case/factories/profile-use-case-factory';
import { FastifyRequest, FastifyReply} from 'fastify';

export async function userProfile(request: FastifyRequest, reply: FastifyReply){
	
	const useCase = ProfileUseCaseUseCaseFactory()
	
	const {user} = await useCase.execute({
		id: request.user.sub
	})

	return reply.status(200).send({
		user:{
			...user,
			password_hash: undefined
		}
	}
	);
}