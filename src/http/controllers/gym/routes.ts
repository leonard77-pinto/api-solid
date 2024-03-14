import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../hooks/verify-jwt';
import { searchGym } from './search';
import { nextGym } from './next';
import { createGym } from './gym';
import { onlyAdmin } from '@/http/hooks/only-admin';

export async function gymRoutes(app: FastifyInstance){
	app.addHook('onRequest', verifyJwt)

	app.get('/gyms/search', searchGym)
	app.get('/gyms/next', nextGym)

	app.post('/gyms', {onRequest: onlyAdmin}, createGym)

}