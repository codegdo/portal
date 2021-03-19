import express, { Application, Request } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { getConnection } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import { Session } from './models/portal/entities';
import { sessionSecret } from './configs';

declare module 'express-session' {
  export interface Session {
    user: { [key: string]: any };
  }
}

export const appMiddleware = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use((req, _res, next) => {
    console.log('req.session', req.session);
    next();
  });

  app.use(
    cors((_req: Request, callback) => {
      callback(null, {
        origin: 'http://localhost:3000',
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
        maxAge: 60 * 1000,
      },
      store: new TypeormStore({
        repository: getConnection('default').getRepository(Session),
      }),
    })
  );
};
