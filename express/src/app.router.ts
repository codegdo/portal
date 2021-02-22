import { Application } from 'express';

import { authRouter } from './api';

export const appRouter = (app: Application): void => {
  app.use('/', authRouter);
};
