import "dotenv/config"
import { Sequelize } from 'sequelize'
import { envSchema } from '../types/env'

const env = envSchema.parse(process.env)

export const sequelize = new Sequelize(
  env.DB_NAME as string,
  env.DB_USER as string,
  env.DB_PASS as string,
  {
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
)
