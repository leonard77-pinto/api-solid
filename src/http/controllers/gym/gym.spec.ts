import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest';

import { app } from '@/app';
import { createUserAndAuthenticade } from '@/utils/test/create-user-and-authenticade';

describe('Gym (e2e)', ()=>{
  beforeAll(async()=>{
    await app.ready()
  })

  afterAll(async()=>{
    await app.close()
  })
  
  it('test-create-gym', async ()=>{
        const token = await createUserAndAuthenticade(app)
        
        const res = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'gym-1',
          lati: 0,
          long: 0
        })
        
        expect(res.statusCode).toEqual(201)

  })  
})