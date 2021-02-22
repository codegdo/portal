import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { getConnection } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import { Session } from './models/portal/entities';
import { sessionSecret } from './configs';

export const appMiddleware = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
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
