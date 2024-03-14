import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../hooks/verify-jwt';
import { createCheckIn } from './check-in';
import { validateCheckIn } from './validate';
import { historyCheckIn } from './history';

export async function checkInRoutes(app: FastifyInstance){
	app.addHook('onRequest', verifyJwt)

	app.post('/gyms/:gymId/check-in', createCheckIn)
	app.patch('/check-in/:checkInId/validate', validateCheckIn)
	app.get('/check-in/history', historyCheckIn)
}