import 'reflect-metadata';
import express, { Application } from 'express';
import {
  useExpressServer,
  useContainer,
  Action,
  UnauthorizedError,
  ForbiddenError,
} from 'routing-controllers';
import { Container } from 'typedi';
import queryString from 'query-string';

import { rbac, JwtService } from './services';
import { appConnection } from './app.connection';
import { appMiddleware } from './app.middleware';
import { AppError } from './app.error';

export default async (): Promise<Application> => {
  const app = express();
  const jwt = new JwtService();
  const { connections, errorCode } = await appConnection();

  useContainer(Container);
  appMiddleware(app, connections);

  if (connections) {
    useExpressServer(app, {
      authorizationChecker: async ({ request }: Action, roles: string[]) => {
        const { url, session, headers } = request;
        const token = headers['authorization']?.split(' ')[1];
        const { user } = session;

        const t = await jwt.verify(token);

        console.log('TOKEN VERIFY', t);
        console.log('SESSION VERIFY', session);

        if (!user) {
          throw new UnauthorizedError('Session timeout');
        }

        if (roles.indexOf('PROGRAM') > -1) {
          const { query } = queryString.parseUrl(url);
          const { programId } = query;

          console.log(programId);
          const isProgramAuthorize = await rbac.programAuthorize(1, 1);

          if (!isProgramAuthorize) {
            throw new ForbiddenError('Forbidden');
          }
        }

        return true;
      },
      currentUserChecker: async ({ request }: Action): Promise<unknown> => {
        const { session } = request;
        //const token = headers['authorization']?.split(' ')[1];
        let { user } = session;

        return user;
      },
      routePrefix: '/api',
      controllers: [__dirname + '/api/**/*.controller.+(js|ts)'],
      middlewares: [__dirname + '/middlewares/*.middleware.+(js|ts)'],
      interceptors: [],
    });
  } else {
    //
    console.log('DB Connection Fail');

    useExpressServer(app, {
      currentUserChecker: (): string => {
        return errorCode;
      },
      routePrefix: '/api',
      controllers: [AppError],
    });
  }

  return app;
};
