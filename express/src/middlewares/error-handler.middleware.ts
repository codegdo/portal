import { ExpressErrorMiddlewareInterface } from 'routing-controllers';

export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(_error: any, _request: any, _response: any, next: () => any) {
    next();
  }
}
