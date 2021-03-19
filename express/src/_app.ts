import 'reflect-metadata';
import express, { Application } from 'express';
//import { useExpressServer, useContainer, Action } from 'routing-controllers';
import { createConnections, useContainer } from 'typeorm';

import { appRouter } from './app.router';
//import { appConnection } from './app.connection';
import { appMiddleware } from './app.middleware';
import Container from 'typedi';
import { connections } from './configs';

export default async (): Promise<Application> => {
  const app = express();
  useContainer(Container);

  const connection = await createConnections(connections);

  if (connection) {
    appMiddleware(app);
    appRouter(app);
  }

  return app;
};
