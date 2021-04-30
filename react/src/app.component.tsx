import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { mapTemplateToLayout } from './helpers';
import { useAction, useFetch } from './hooks';
import { storage } from './services';

import { AuthRouter, HomeRouter, MarketingRouter, SalesRouter, RewardsRouter } from './views';

export const App: React.FC = (): JSX.Element | null => {
  const subdomain = location.hostname.split('.')[1] ? window.location.host.split('.')[0] : false;
  const { fetching, response, isMounted, fetchData } = useFetch(`/api/preload/start?subdomain=${subdomain}`);
  const user = useSelector((state: AppState) => state.session.user);

  const { updateLayout } = useAction();

  useEffect(() => {
    void fetchData();
  }, [user])

  useEffect(() => {
    if (fetching == 'success') {
      if (isMounted.current) {
        const { data: { orgId, templates } } = response;

        if (orgId) {
          const layout = mapTemplateToLayout(templates);
          updateLayout({ ...layout });
        }

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
