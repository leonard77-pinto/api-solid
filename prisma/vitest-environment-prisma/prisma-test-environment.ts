import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


function generateDataBaseUrl(schema: string){
  if(!process.env.DATABASE_URL){
    throw new Error('Not env: DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
    name:'prisma',
    transformMode: 'ssr',
    setup() {
        const schema = randomUUID()
        const url = generateDataBaseUrl(schema)
        
        process.env.DATABASE_URL=url

        execSync('npx prisma migrate deploy')

        return {
          async teardown() {
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
            await prisma.$disconnect()
          }
        }
      },
}