import { ConnectionOptions } from 'typeorm';

const options: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  synchronize: false,
  logging: false,
};

const portal: ConnectionOptions = {
  ...options,
  database: 'portal',
  name: 'default',
  entities: [__dirname + '/../**/**.entity{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export const connections = [portal];