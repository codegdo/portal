import { Application } from 'express';

import { authRouter } from './api';

export default (app: Application): void => {
  app.use('/api', authRouter);
};