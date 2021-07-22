import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Sale = Template(lazy(() => import('./sale.index')));
const Program = Template(lazy(() => import('./sale.program')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const SaleRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Sale page="sales" />
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