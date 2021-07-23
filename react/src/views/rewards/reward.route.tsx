import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Reward = Template(lazy(() => import('./reward.index')));
const Program = Template(lazy(() => import('./reward.program')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const RewardRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Reward page="rewards" />
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
