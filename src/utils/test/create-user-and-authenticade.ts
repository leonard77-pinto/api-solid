import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createUserAndAuthenticade(app: FastifyInstance){
    await request(app.server)
    .post('/users')
    .send({
        name: 'lia',
        email: 'lia@email.com',
        password: 'lia123'
    })

    const resAuth = await request(app.server)
    .post('/auth')
    .send({
          email: 'lia@email.com',
          password: 'lia123'
    })
    
    const {token} = resAuth.body

    return token
}