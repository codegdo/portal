import 'reflect-metadata';
import express, { Application } from 'express';
import { useExpressServer, useContainer, Action } from 'routing-controllers';
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
      authorizationChecker: async () => {
        return true;
      },
      currentUserChecker: async (action: Action) => {
        const token = action.request.headers['authorization'];
        console.log('currentUserCheck', action.request.session);
        console.log(token);
        //return getEntityManager().findOneByToken(User, token);
      },
      routePrefix: '/api',
      controllers: [__dirname + '/api/**/*.controller.+(js|ts)'],
      middlewares: [__dirname + '/middlewares/*.middleware.+(js|ts)'],
      interceptors: [],
    });
  }

  return app;
};
