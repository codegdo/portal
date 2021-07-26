import { Request, Response, NextFunction } from 'express';

import {
  ExpressMiddlewareInterface,
  //UnauthorizedError
} from 'routing-controllers';

export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, _res: Response, next: NextFunction): void {
    //const ua = req.get('user-agent');
    //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    //console.log('ip', req.ip);
    //console.log('headers', req.headers);
    //console.log('user-agent', ua);
    console.log('guard middleward - user', req?.session.user);

    if (req?.session.user === undefined) {
      //throw new UnauthorizedError('Session timeout');
    }

    if ('authorization' in req.headers) {
      const token = req.headers['authorization'];
      console.log(token);
    }
    next();
  }
}
