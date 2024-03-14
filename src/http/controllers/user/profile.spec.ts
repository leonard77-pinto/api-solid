import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest';

import { app } from '@/app';
import { createUserAndAuthenticade } from '@/utils/test/create-user-and-authenticade';

describe('Profile (e2e)', ()=>{
  beforeAll(async()=>{
    await app.ready()
  })

  afterAll(async()=>{
    await app.close()
  })
  
  it('test-get-profile', async ()=>{
        const token = await createUserAndAuthenticade(app)
        
        const res = await request(app.server)
        .get('/me')
        .set('Authorization', `Bearer ${token}`)
        .send()

        
        expect(res.statusCode).toEqual(200)
  })  
})