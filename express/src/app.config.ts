import { ConnectionOptions } from 'typeorm';

const portal: ConnectionOptions = {
  database: 'portal',
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  synchronize: true,
  entities: ['./portal/**/*.entity{.js}']
}

export const connections = [portal]