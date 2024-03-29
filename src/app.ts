import fastfy from 'fastify';
import { userRoutes } from './http/controllers/user/routes';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { gymRoutes } from './http/controllers/gym/routes';
import { checkInRoutes } from './http/controllers/check-in/routes';
import fastifyCookie from '@fastify/cookie';

export const app = fastfy();

app.register(fastifyCookie)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign:{
        expiresIn: '10m',
    }
})

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, req, rep) => {
    if (error instanceof ZodError) {
        return rep.status(400).send({
            message: 'Validation failed!',
            issues: error.format()
        })
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }

    return rep.status(500).send({
        message: 'unknow error'
    })
})