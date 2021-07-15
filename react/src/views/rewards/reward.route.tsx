import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const reward = lazy(() => import('./reward.component'));
const program = lazy(() => import('./reward.program'));
const notfound = lazy(() => import('../notfound.component'));

export const RewardRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="rewards" component={reward} />
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
