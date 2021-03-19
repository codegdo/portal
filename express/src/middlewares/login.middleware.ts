import { Request, Response, NextFunction } from 'express';

export const loginMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
): any => {
  next();
};
