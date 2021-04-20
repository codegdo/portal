import React, { Suspense, lazy } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';

import { NavMain } from '../nav/nav.partial';
import { stripTrailingSlash, stringTemplateReplace } from '../../utils';
import { TemplateComponentProps } from './template.type';
import { AppState } from '../../store/reducers';
import { useSelector } from 'react-redux';

export const TemplateComponent: React.FC<TemplateComponentProps> = (props): JSX.Element => {
  const { route } = props;
  const { url } = useRouteMatch();
  const { layout, session } = useSelector((state: AppState) => state);

  const { component = 'notfound.component.tsx', redirectTo = '/' } = route;
  const urlRedirect = stripTrailingSlash(`${url}/${redirectTo}`);

  const Content = lazy(
    () => import(`../../views/${component}`)
  );

  const { external, internal, na } = layout;
  const { path = 'main' } = route;
  const key = path.replace('/', '');
  let template = `<Content />`;

  if (session.loggedIn) {
    template = stringTemplateReplace(external.main);
  } else {
    template = stringTemplateReplace(na[key] || na['main']);
  }

  return route.redirectTo ? <Redirect to={urlRedirect} /> : (
    <Suspense fallback={null}>
      <JsxParser
        renderInWrapper={false}
        bindings={{}}
        components={{ Content, NavMain }}
        jsx={template}
      />
    </Suspense>
  );
};
