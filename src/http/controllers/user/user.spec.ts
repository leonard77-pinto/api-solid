import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest';

import { app } from '@/app';

describe('User create (e2e)', ()=>{
  beforeAll(async()=>{
    await app.ready()
  })

  afterAll(async()=>{
    await app.close()
  })
  
  it('test-user-create', async ()=>{
    const res = await request(app.server)
        .post('/users')
        .send({
            name: 'lia',
            email: 'lia@email.com',
            password: 'lia123'
        })
    
    expect(res.statusCode).toEqual(201)
  })  
})