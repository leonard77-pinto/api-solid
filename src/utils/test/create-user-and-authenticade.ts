import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createUserAndAuthenticade(app: FastifyInstance, isAdmin=false){

    await prisma.user.create({
        data: {
            name: 'test',
            email: 'test@email.com',
            password_hash: await hash('123', 6),
            role: isAdmin ? 'ADMIN': 'MEMBER'
        }
    })

    const resAuth = await request(app.server)
    .post('/auth')
    .send({
          email: 'test@email.com',
          password: '123'
    })
    
    const {token} = resAuth.body

    return token
}