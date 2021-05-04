import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import { useSelector } from 'react-redux';

import { NavMain } from '../nav/nav.partial';
import { stripTrailingSlash, stringTemplateReplace } from '../../utils';
import { TemplateProps } from './template.type';
import { AppState } from '../../store/reducers';
import { mainExternal, mainInternal, mainNA } from '../../layouts';

export const Template: React.FC<TemplateProps> = (props): JSX.Element => {
  const { route } = props;
  const { url } = useRouteMatch();
  const { layout, session: { user } } = useSelector((state: AppState) => state);

  const { component = 'notfound.component.tsx', redirectTo = '/' } = route || {};
  const urlRedirect = stripTrailingSlash(`${url}/${redirectTo}`);

  const Content = lazy(
    () => import(`../../views/${component}`)
  );

  const { external, internal, na } = layout;
  const { path = '/' } = route;
  const key = path.replace('/', '') || 'main';
  let template = `<Content />`;

  if (user) {
    template = (user && user.roleType === 'internal') ? (internal[key] || internal['main'] || mainInternal) : (external[key] || external['main'] || mainExternal);
  } else {
    template = na[key] || na['main'] || mainNA;
  }

  template = stringTemplateReplace(template);

  useLayoutEffect(() => {
    //document.body.classList.add((path == '/' ? 'home' : key));
    document.body.setAttribute('data-page', (path == '/' ? 'home' : key));

    //return () => {
    //document.body.classList.remove((path == '/' ? 'home' : key));
    //};
  }, []);

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
