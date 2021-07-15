import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';
const notfound = lazy(() => import('../notfound.component'));

const sale = lazy(() => import('./sale.component'));
//const program = lazy(() => import('./sale.program'));

export const SaleRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="sales" component={sale} />
    },
    {
      path: ':programId*',
      element: <Template name="program" component={sale} />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};