import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Account = Template(lazy(() => import('./account.index')));
const Profile = Template(lazy(() => import('./profile/profile.component')));
const Subscription = Template(lazy(() => import('./subscription/subscription.component')));
const Notfound = Template(lazy(() => import('../notfound.component')));

export const AccountRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Account name="account" />
    },
    {
      path: 'profile',
      element: <Profile name="profile" />
    },
    {
      path: 'subscription',
      element: <Subscription name="subscription" />
    },
    {
      path: '*',
      element: <Notfound name="not-found" />
    },
  ]);

  return <>{routes}</>;
};
