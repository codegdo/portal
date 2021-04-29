import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { mapTemplateToLayout } from './helpers';
import { useAction, useFetch } from './hooks';

import { AuthRouter, HomeRouter, MarketingRouter, SalesRouter, RewardsRouter } from './views';

export const App: React.FC = (): JSX.Element | null => {
  const subdomain = location.hostname.split('.')[1] ? window.location.host.split('.')[0] : 'partnerportal';
  const { updateLayouts } = useAction();
  const { fetching, response, isMounted, fetchData } = useFetch(`/api/app/start?subdomain=${subdomain}`, { init: true });

  useEffect(() => {
    void fetchData();
  }, [subdomain])

  useEffect(() => {
    if (fetching == 'success') {

      if (isMounted.current) {
        const layouts = mapTemplateToLayout(response.data.templates);
        updateLayouts({ ...response.data.layouts });
      }
    }
  }, [fetching]);

  return response ? (
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
  ) : null;
};
