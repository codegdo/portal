import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const marketing = lazy(() => import('./marketing.component'));
const program = lazy(() => import('./marketing.program'));
const notfound = lazy(() => import('../notfound.component'));

export const MarketingRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="marketing" component={marketing} />
    },
    {
      path: ':programId*',
      element: <Template name="program" component={program} />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};
