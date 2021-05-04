import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { Display } from './components/element';

import { RouteGuard } from './components/route/route.guard';
import { Template } from './components/template/template.component';
import { mapTemplateToLayout } from './helpers';
import { useAction, useFetch } from './hooks';
import { AppState } from './store/reducers';

import { AuthRouter, HomeRouter, MarketingRouter, SalesRouter, RewardsRouter } from './views';

export const App: React.FC = (): JSX.Element | null => {
  const subdomain = location.hostname.split('.')[1] ? window.location.host.split('.')[0] : false;
  const { fetching, response, isMounted, fetchData } = useFetch(`/api/preload/start?subdomain=${subdomain}`);
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);

  const { updateLayout } = useAction();

  useEffect(() => {
    void fetchData();
  }, [loggedIn])

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

  return response ?
    (response.ok ?
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
          </BrowserRouter>
        </HashRouter>
      ) : <Display type=""><div>opps... system was down</div></Display>
    ) : null;
};
