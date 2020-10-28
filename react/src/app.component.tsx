import React from 'react';
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { AuthRouter } from './views/auth/auth.router';
import { HomeRouter } from './views/home/home.router';
import { MarketingRouter } from './views/marketing/marketing.router';
import { SalesRouter } from './views/sales/sales.router';
import { RewardsRouter } from './views/rewards/rewards.router';

export const App: React.FC = (): JSX.Element => {
  return (
    <HashRouter hashType="noslash">
      <BrowserRouter>
        <Switch>
          <RouteGuard exact path="/">
            <HomeRouter />
          </RouteGuard>
          <Route path="/auth">
            <AuthRouter />
          </Route>
          <RouteGuard path="/marketing">
            <MarketingRouter />
          </RouteGuard>
          <RouteGuard path="/sales">
            <SalesRouter />
          </RouteGuard>
          <RouteGuard path="/rewards">
            <RewardsRouter />
          </RouteGuard>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </HashRouter>
  );
};
