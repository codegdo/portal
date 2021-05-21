import React from 'react';

import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Display } from './components/element';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { usePreload } from './hooks/preload.hook';


import { AuthRouter, HomeRouter, MarketingRouter, SalesRouter, RewardsRouter } from './views';

export const App: React.FC = (): JSX.Element | null => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { preload, sessionTimeout } = usePreload();


  return preload ?
    (preload.ok ?
      (
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
            {sessionTimeout && <Redirect to='/auth/logout' />}
          </BrowserRouter>
        </HashRouter>
      ) : <Display type=""><div>opps... system was down</div></Display>
    ) : null;
};
