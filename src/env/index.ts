import 'dotenv/config'
import { z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _v = schema.safeParse(process.env)

if (!_v.success){
    console.error('Invalid .env content!', _v.error.format())
    throw new Error('Invalid .env content!')
}

export const env = _v.data