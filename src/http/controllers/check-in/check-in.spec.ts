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
  
  it('test-create', async ()=>{
        const token = await createUserAndAuthenticade(app)
        
        const gym = await prisma.gym.create({
          data: {
            name: 'gym-a',
            lati: 0,
            long:0,
          }
        })

        const res = await request(app.server)
        .post(`/gyms/${gym.id}/check-in`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lati: 0,
          long: 0
        })

        expect(res.statusCode).toEqual(201)

  })  
})