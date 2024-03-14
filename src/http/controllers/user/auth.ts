import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserNotExistError } from '@/use-case/erros/user-not-exist-error';
import { authUseCaseFactory } from '@/use-case/factories/auth-use-case-factory';

export async function authUser(request: FastifyRequest, reply: FastifyReply) {

	const _register = authUseCaseFactory()

	const schemaUser = z.object({
		email: z.string().email(),
		password: z.string()
	});

	const _user = schemaUser.parse(request.body);

	try {
		const { user } = await _register.execute(_user);

		const token = await reply.jwtSign(
			{
				role: user.role
			}
			, {
				sign: {
					sub: user.id
				}
			})

		const refreshToken = await reply.jwtSign({
			role: user.role
		}, {
			sign: {
				sub: user.id,
				expiresIn: '7d'
			}
		})

		return reply.status(200)
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.send({
				token
			});
	} catch (error) {
		if (error instanceof UserNotExistError) {
			return reply.status(400).send({
				message: error.message
			});
		}

		throw error
	}

}