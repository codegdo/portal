import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import { useSelector } from 'react-redux';

import { NavMain } from '../nav/nav.partial';
import { stripTrailingSlash } from '../../utils';
import { TemplateProps } from './template.type';
import { AppState } from '../../store/reducers';
import { mainExternal, mainGeneral, mainInternal } from '../../layouts';

const Loading: React.FC = (): JSX.Element => {
  return <div>loading</div>
}

export const Template: React.FC<TemplateProps> = (props): JSX.Element => {
  const { route } = props;
  const { url } = useRouteMatch();
  const { layout, session: { loggedIn, user, orgId } } = useSelector((state: AppState) => state);

  const { component = 'notfound.component.tsx', redirectTo = '/' } = route || {};
  const urlRedirect = stripTrailingSlash(`${url}/${redirectTo}`);

  const Content = lazy(
    () => import(`../../views/${component}`)
  );

  const { external, internal, general } = layout;
  const { path = '/' } = route;
  const key = path.replace('/', '') || 'main';
  let template = `<Content {...props}/>`;

  if (loggedIn && orgId) {
    template = (user && user.roletype === 'internal') ? (internal[key] || internal['main'] || mainInternal) : (external[key] || external['main'] || mainExternal);
  } else {
    template = general[key] || general['main'] || mainGeneral;
  }

  //template = stringTemplateReplace(template);
  const fallback = template.replace('<Content', '<Loading');

  console.log('TEMPLATE FALLBACK', fallback);

  useLayoutEffect(() => {
    //document.body.classList.add((path == '/' ? 'home' : key));
    document.body.setAttribute('data-page', (path == '/' ? 'home' : key));

    //return () => {
    //document.body.classList.remove((path == '/' ? 'home' : key));
    //};
  }, []);

  return route.redirectTo ? <Redirect to={urlRedirect} /> : (
    <Suspense fallback={<JsxParser renderInWrapper={false} jsx={fallback} />}>
      <JsxParser
        renderInWrapper={false}
        bindings={{}}
        components={{ Content, NavMain, Loading }}
        jsx={template}
      />
    </Suspense>
  );
};
