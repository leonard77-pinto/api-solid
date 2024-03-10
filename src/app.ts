import fastfy from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastfy();

app.register(appRoutes);

app.setErrorHandler((error, req, rep) => {
    if (error instanceof ZodError) {
        return rep.status(400).send({
            message: 'Validation failed!',
            issues: error.format()
        })
    }

    if(env.NODE_ENV != 'production'){
        console.error(error)
    }

    return rep.status(500).send({
        message: 'unknow error'
    })
})