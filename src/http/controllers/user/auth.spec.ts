import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest';

import { app } from '@/app';

describe('Auth (e2e)', ()=>{
  beforeAll(async()=>{
    await app.ready()
  })

  afterAll(async()=>{
    await app.close()
  })
  
  it('test-auth', async ()=>{
    await request(app.server)
        .post('/users')
        .send({
            name: 'lia',
            email: 'lia@email.com',
            password: 'lia123'
        })
  
        const res = await request(app.server)
        .post('/auth')
        .send({
              email: 'lia@email.com',
              password: 'lia123'
        })
  
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            token: expect.any(String)
        })
  })  
})