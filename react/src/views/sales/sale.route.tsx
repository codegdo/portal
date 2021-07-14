import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const sale = lazy(() => import('./sale.component'));
const program = lazy(() => import('./sale.program'));

export const SaleRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="sales" component={sale} />
    },
    {
      path: ':programId*',
      element: <Template name="program" component={program} />
    }
  ]);

  return <>{routes}</>;
};