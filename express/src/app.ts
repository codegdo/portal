import express from 'express';
import { createConnections, useContainer } from 'typeorm';
import { Container } from 'typedi';

import { connections } from './app.config';

import appRouter from './app.router';

const app = express();

useContainer(Container);
createConnections(connections)
  .then(_connection => {
    appRouter(app);

    console.log('db connected');
  })
  .catch(error => console.log(error));

export default app;
