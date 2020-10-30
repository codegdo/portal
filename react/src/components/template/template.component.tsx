import React, { Suspense, lazy } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';

import { RouteComponentData } from '../route/route.component';

import { NavMain } from '../nav/nav.partial';

export interface TemplateComponentProps {
  route: RouteComponentData;
}

export const TemplateComponent: React.FC<TemplateComponentProps> = ({
  route,
}): JSX.Element => {
  const { url } = useRouteMatch();
  const { component = 'notfound.component.tsx', redirectTo = '/' } = route;
  const urlRedirect = (url + redirectTo).replace(/\/\//g, '/');

  const MainComponent = lazy(
    () => import(`../../views/${component}`)
  );

  console.log(urlRedirect);

  return route.redirectTo ? <Redirect to={urlRedirect} /> : (
    <Suspense fallback={null}>
      <JsxParser
        bindings={{}}
        components={{ MainComponent, NavMain }}
        jsx={`<MainComponent /> <NavMain />`}
      />
    </Suspense>
  );
};
