import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Reward = Template(lazy(() => import('./reward.component')));
const Program = Template(lazy(() => import('./reward.program')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const RewardRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Reward name="rewards" />
    },
    {
      path: ':programId*',
      element: <Program name="program" />
    },
    {
      path: '*',
      element: <NotFound name="not-found" />
    },
  ]);

  return <>{routes}</>;
};
