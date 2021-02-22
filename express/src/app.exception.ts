import { Application, Request, Response, NextFunction } from 'express';

export const appException = (app: Application): void => {
  app.use((err: any, _req: Request, res: Response, next: NextFunction): any => {
    if (err) {
      let error: string = '';
      const { statusCode, message } = err;

      switch (statusCode) {
        case 500:
          error = 'Internal Server Error';
          break;
        case 400:
          error = 'Bad Request';
          break;
        case 403:
          error = 'Forbidden';
          break;
        case 404:
          error = 'Not Found';
          break;
      }

      console.log(err.stack);

      return res.status(statusCode).send({
        statusCode,
        message,
        error,
      });
    }

    next(err);
  });
};

export class ExceptionHttp extends Error {
  statusCode: number;

  constructor(statusCode: number, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExceptionHttp);
    }

    this.name = 'ExceptionHttp';
    this.statusCode = statusCode;
  }
}
