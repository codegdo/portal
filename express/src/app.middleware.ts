import express, { Application, Request } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { getConnection } from 'typeorm';
import { Session } from './models/portal/entities';
import { sessionSecret } from './configs';
import { TypeormStore } from 'connect-typeorm/out';

declare module 'express-session' {
  export interface Session {
    user: { [key: string]: any };
  }
}

export const appMiddleware = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors((_req: Request, callback) => {
      callback(null, {
        origin: ['http://localhost:3000', 'https://portal.dev'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Expiry'],
        exposedHeaders: ['Authorization', 'Expiry'],
      });
    })
  );

  app.use(
    session({
      secret: [sessionSecret || ''],
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000,
      },
      store: new TypeormStore({
        cleanupLimit: 0,
        limitSubquery: false, // If using MariaDB.
        ttl: 360,
      }).connect(getConnection('default').getRepository(Session)),
    })
  );
};
