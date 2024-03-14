import { FastifyInstance } from 'fastify';
import { createUser } from './user';
import { authUser } from './auth';
import { userProfile } from './profile';
import { verifyJwt } from '../../hooks/verify-jwt';
import { refresh } from './refresh';

export async function userRoutes(app: FastifyInstance){
	app.post('/users', createUser);
	app.post('/auth', authUser);
	app.patch('/token/refresh', refresh);

	app.get('/me',{onRequest:[verifyJwt]}, userProfile)
}