import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest';

import { app } from '@/app';
import { createUserAndAuthenticade } from '@/utils/test/create-user-and-authenticade';

describe('Gym search (e2e)', ()=>{
  beforeAll(async()=>{
    await app.ready()
  })

  afterAll(async()=>{
    await app.close()
  })
  
  it('test-search', async ()=>{
        const token = await createUserAndAuthenticade(app)
        
        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'gym-1',
          lati: 0,
          long: 0
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'gym-2',
          lati: 0,
          long: 0
        })

        const res = await request(app.server)
          .get('/gyms/search')
          .set('Authorization', `Bearer ${token}`)
          .query({
            q: 'gym-1'
          })
          .send()

        expect(res.statusCode).toEqual(200)
        expect(res.body.gyms).toHaveLength(1)

  })  
})