import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';

import { AuthRouter, HomeRouter, MarketingRouter, SalesRouter, RewardsRouter } from './views';

export const App: React.FC = (): JSX.Element => {
  return (
    <HashRouter hashType="noslash">
      <BrowserRouter>
        <Switch>
          <RouteGuard exact path="/" component={HomeRouter} />
          <Route path="/auth" component={AuthRouter} />
          <RouteGuard path="/marketing" component={MarketingRouter} />
          <RouteGuard path="/sales" component={SalesRouter} />
          <RouteGuard path="/rewards" component={RewardsRouter} />
          <Route path="*" component={Template} />
        </Switch>
      </BrowserRouter>
    </HashRouter>
  );
};
