import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest';

import { app } from '@/app';
import { createUserAndAuthenticade } from '@/utils/test/create-user-and-authenticade';
import { prisma } from '@/lib/prisma';

describe('CheckIn (e2e)', ()=>{
  beforeAll(async()=>{
    await app.ready()
  })

  afterAll(async()=>{
    await app.close()
  })
  
  it('test-validate', async ()=>{
        const token = await createUserAndAuthenticade(app)
        
        const user  = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
          data: {
            name: 'gym-a',
            lati: 0,
            long:0,
          }
        })

        const checkIn  = await prisma.checkIn.create({
          data:{
            gymId: gym.id,
            userId: user.id
          }
        })

        const res = await request(app.server)
        .patch(`/check-in/${checkIn.id}/validate`)
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(res.statusCode).toEqual(204)

  })  
})