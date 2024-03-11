import { FastifyInstance } from 'fastify';
import { createUser } from './controllers/user.controller';
import { authUser } from './controllers/auth.controller';

export async function appRoutes(app: FastifyInstance){
	app.post('/users', createUser);
	app.post('/auth', authUser);
}