import { Request, Response, NextFunction } from 'express';

export const guardMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // check and validating jwt
  //
  if ('x-jwt' in req.headers) {
    const token = req.headers['x-jwt'];
    console.log(token);
  }
  next();
};
