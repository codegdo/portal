import { Request, Response, NextFunction } from 'express';

export const guardMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // check and validating jwt

  console.log('guard', req.session);

  if ('authorization' in req.headers) {
    const token = req.headers['authorization'];
    console.log(token);
  }
  next();
};
