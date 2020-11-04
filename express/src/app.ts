import express from 'express';
import { createConnections, useContainer } from 'typeorm';
import { Container } from 'typedi';

import { connections } from './app.config';

const app = express();

useContainer(Container);
createConnections(connections)
  .then(_connection => { console.log('connected') })
  .catch(error => console.log(error));

app.get('/', (_req, res) => {
  res.send('hello there');
});

export default app;
