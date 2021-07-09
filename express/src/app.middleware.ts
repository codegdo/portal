import express, { Application, Request } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { Connection, getConnection } from 'typeorm';
import { Session } from './models/portal/entities';
import { sessionSecret, corsOrigin } from './configs';
import { TypeormStore } from 'connect-typeorm/out';

declare module 'express-session' {
  export interface Session {
    user: Record<string, unknown>;
  }
}

export const appMiddleware = (app: Application, connections: Connection[] | null): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    cors((_req: Request, callback) => {
      callback(null, {
        origin: corsOrigin || '*',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Expiry'],
        exposedHeaders: ['Authorization', 'Expiry'],
      });
    })
  );

  if (connections) {
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
  }

};
