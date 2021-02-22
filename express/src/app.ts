import 'reflect-metadata';
import express, { Application } from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { appConnection } from './app.connection';
import { appMiddleware } from './app.middleware';

export default async (): Promise<Application> => {
  let app = express();
  const connections = await appConnection();

  useContainer(Container);

  if (connections) {
    appMiddleware(app);
    useExpressServer(app, {
      controllers: [__dirname + '/api/**/*.controllers.ts'],
      middlewares: [__dirname + '/middlewares/*.middleware.ts'],
      interceptors: [],
    });
  }

  return app;
};
