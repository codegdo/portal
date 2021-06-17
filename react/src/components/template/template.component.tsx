import React, { Suspense, lazy, useLayoutEffect, useMemo } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import { useSelector } from 'react-redux';

import { NavMain, NavProfile, NavSub } from '../nav/nav.component';
import { stripTrailingSlash } from '../../utils';
import { TemplateProps } from './template.type';
import { AppState } from '../../store/reducers';
import { mainExternal, mainGeneral, mainInternal } from '../../layouts';

const Placeholder: React.FC = (): JSX.Element | null => {
  return null;
}

export const Template: React.FC<TemplateProps> = (props): JSX.Element => {
  const { route = {} } = props;
  const { url } = useRouteMatch();
  const { layout, session: { loggedIn, user, orgId } } = useSelector((state: AppState) => state);

  const { component = 'notfound.component.tsx', redirectTo = '/' } = route;
  const urlRedirect = stripTrailingSlash(`../${url}/${redirectTo}`);

  const Content = lazy(
    () => import(`../../views/${component}`)
  );

  const { external, internal, general } = layout;
  const { path = '/' } = route;
  const key = path.replace('/', '') || 'main';
  let template = `<Content {...props}/>`;

  if (loggedIn && orgId) {
    template = (user?.roletype === 'internal') ? (internal[key] || internal['main'] || mainInternal) : (external[key] || external['main'] || mainExternal);
  } else {
    template = general[key] || general['main'] || mainGeneral;
  }

  const placeholder = template.replace('<Content', '<Placeholder');

  //const NavMain = useMemo(() => navmain, [component.split('/')[0]])

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ url }}
      components={{ Content, NavMain, NavProfile, NavSub, Placeholder }}
      jsx={template}
    />
  }, []);

  const jsxPlaceholder = useMemo(() => <JsxParser allowUnknownElements={false} renderInWrapper={false} jsx={placeholder} />, [])

  useLayoutEffect(() => {
    //document.body.classList.add((path == '/' ? 'home' : key));
    document.body.setAttribute('data-page', (path == '/' ? 'home' : key));

    //return () => {
    //document.body.classList.remove((path == '/' ? 'home' : key));
    //};

  }, []);

  return route.redirectTo ? <Redirect to={urlRedirect} /> : (
    <Suspense fallback={jsxPlaceholder}>
      {
        jsxTemplate
      }
    </Suspense>
  );
};
