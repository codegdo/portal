import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import { Link, } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import { useSelector } from 'react-redux';

import * as Nav from '../nav';
//import { stripTrailingSlash } from '../../utils';
import { TemplateProps } from './template.type';
import { AppState } from '../../store/reducers';
import { mainExternal, mainGeneral, mainInternal } from '../../layouts';
import { useLocation } from 'react-router';

export const Template: React.FC<TemplateProps> = (props): JSX.Element => {
  const { name } = props;
  const { layout, session: { loggedIn, user, orgId } } = useSelector((state: AppState) => state);
  const { pathname } = useLocation();

  const { external, internal, general } = layout;
  let template = `<Content {...props}/>`;

  if (loggedIn && orgId) {
    if (user?.roletype === 'internal') {
      template = internal[name] || internal['main'] || mainInternal;
    } else {
      template = external[name] || external['main'] || mainExternal;
    }
  } else {
    template = general[name] || general['main'] || mainGeneral;
  }

  const Content = (props: any) => <props.component {...props} />;
  const components: Record<string, any> = {
    Content, Link, ...Nav
  }

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, [pathname]);

  const jsxFallback = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      jsx={document.getElementById('root')?.innerHTML.trim()} />
  }, [pathname]);

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', name);
  }, []);

  return <Suspense fallback={jsxFallback}>{jsxTemplate}</Suspense>;
};
