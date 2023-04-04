import dotenv from 'dotenv'
import path from 'path'
import { Pool } from 'pg'

dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') })
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const conn = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  port: parseInt(POSTGRES_PORT ?? '5432'),
})
