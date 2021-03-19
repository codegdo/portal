import React, { Suspense, lazy } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';

import { NavMain } from '../nav/nav.partial';
import { stripTrailingSlash } from '../../utils';
import { TemplateComponentProps } from './template.type';

export const TemplateComponent: React.FC<TemplateComponentProps> = (props): JSX.Element => {
  const { route } = props;
  const { url } = useRouteMatch();
  const { component = 'notfound.component.tsx', redirectTo = '/' } = route;
  const urlRedirect = stripTrailingSlash(`${url}/${redirectTo}`);

  const MainComponent = lazy(
    () => import(`../../views/${component}`)
  );

  console.log(urlRedirect);

  return route.redirectTo ? <Redirect to={urlRedirect} /> : (
    <Suspense fallback={null}>
      <JsxParser
        bindings={{}}
        components={{ MainComponent, NavMain }}
        jsx={`<NavMain /><MainComponent />`}
      />
    </Suspense>
  );
};
