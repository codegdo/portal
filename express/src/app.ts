import 'reflect-metadata';
import express, { Application } from 'express';
import {
  useExpressServer,
  useContainer,
  Action,
  UnauthorizedError,
} from 'routing-controllers';
import { Container } from 'typedi';

import { appConnection } from './app.connection';
import { appMiddleware } from './app.middleware';

export default async (): Promise<Application> => {
  const app = express();
  const connections = await appConnection();

  useContainer(Container);

  if (connections) {
    appMiddleware(app);
    useExpressServer(app, {
      authorizationChecker: async (): Promise<boolean> => {
        console.log('test');
        return true;
      },
      currentUserChecker: async ({ request }: Action): Promise<unknown> => {
        const token = await request.headers['authorization'];

        console.log('currentUserCheck', request.session);
        console.log(token);
        // return getEntityManager().findOneByToken(User, token);

        if (!request.session.user) {
          throw new UnauthorizedError('Session timeout');
        }

        return request.session.user;
      },
      routePrefix: '/api',
      controllers: [__dirname + '/api/**/*.controller.+(js|ts)'],
      middlewares: [__dirname + '/middlewares/*.middleware.+(js|ts)'],
      interceptors: [],
    });
  }

  return app;
};
