import { Application } from 'express';

import { authRouter, homeRouter } from './api';

export const appRouter = (app: Application): void => {
  app.use('/api/auth', authRouter);
  app.use('/api', homeRouter);
};
