import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Account = Template(lazy(() => import('./account.index')));
const Profile = Template(lazy(() => import('./profile/profile.page')));
const Subscription = Template(lazy(() => import('./subscription/subscription.page')));
const Notfound = Template(lazy(() => import('../notfound.component')));

export const AccountRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Account page="account" />
    },
    {
      path: 'profile',
      element: <Profile page="profile" />
    },
    {
      path: 'subscription',
      element: <Subscription page="subscription" />
    },
    {
      path: '*',
      element: <Notfound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};
