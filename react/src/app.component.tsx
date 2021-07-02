import React from 'react';
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Display } from './components/element';
import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { usePreload } from './hooks/preload.hook';
import { AuthRouter, HomeRouter, AdminRouter, MarketingRouter, SalesRouter, RewardsRouter, AccountRouter } from './views';

export const App: React.FC = (): JSX.Element | null => {

  const { preload, sessionTimeout } = usePreload();

  return preload ?
    (preload.ok ?
      (
        <HashRouter hashType="noslash">
          <BrowserRouter>
            <Switch>
              <Redirect from='/home' to='/' />
              <RouteGuard exact path="/" component={HomeRouter} />
              <Route path="/auth" component={AuthRouter} />
              <RouteGuard path="/account" component={AccountRouter} />
              <RouteGuard path="/marketing" component={MarketingRouter} />
              <RouteGuard path="/coops" component={MarketingRouter} />
              <RouteGuard path="/mdfs" component={MarketingRouter} />
              <RouteGuard path="/sales" component={SalesRouter} />
              <RouteGuard path="/vars" component={SalesRouter} />
              <RouteGuard path="/spas" component={SalesRouter} />
              <RouteGuard path="/rewards" component={RewardsRouter} />
              <RouteGuard path="/rebates" component={RewardsRouter} />
              <RouteGuard path="/spiffs" component={RewardsRouter} />
              <RouteGuard path="/admin" component={AdminRouter} />
              <Route path="*" component={Template} />
            </Switch>
            {sessionTimeout && <Redirect to='/auth/logout' />}
          </BrowserRouter>
        </HashRouter>
      ) : <Display type=""><div>opps... system was down</div></Display>
    ) : null;
};
