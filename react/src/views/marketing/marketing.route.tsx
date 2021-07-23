import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Marketing = Template(lazy(() => import('./marketing.index')));
const Program = Template(lazy(() => import('./marketing.program')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const MarketingRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Marketing page="marketing" />
    },
    {
      path: ':programId*',
      element: <Program page="program" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};
