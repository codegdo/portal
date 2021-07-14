import React from 'react';
import { useRoutes } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { AuthRoute, AdminRoute, HomeRoute, AccountRoute, MarketingRoute, RewardRoute, SaleRoute, notfound } from './views';

export const AppRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '//*',
      element: <RouteGuard path='/' element={<HomeRoute />} />
    },
    {
      path: '/account*',
      element: <RouteGuard path='/' element={<AccountRoute />} />
    },
    {
      path: '/admin*',
      element: <RouteGuard path='/' element={<AdminRoute />} />
    },
    {
      path: '/marketing*',
      element: <RouteGuard path='/' element={<MarketingRoute />} />
    },
    {
      path: '/coop*',
      element: <RouteGuard path='/' element={<MarketingRoute />} />
    },
    {
      path: '/mdf*',
      element: <RouteGuard path='/' element={<MarketingRoute />} />
    },
    {
      path: '/rewards*',
      element: <RouteGuard path='/' element={<RewardRoute />} />
    },
    {
      path: '/rebate*',
      element: <RouteGuard path='/' element={<RewardRoute />} />
    },
    {
      path: '/spiff*',
      element: <RouteGuard path='/' element={<RewardRoute />} />
    },
    {
      path: '/sales*',
      element: <RouteGuard path='/' element={<SaleRoute />} />
    },
    {
      path: '/var*',
      element: <RouteGuard path='/' element={<SaleRoute />} />
    },
    {
      path: '/spa*',
      element: <RouteGuard path='/' element={<SaleRoute />} />
    },
    {
      path: '/auth*',
      element: <AuthRoute />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};