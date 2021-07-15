import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import { Link, } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';

import * as Nav from '../nav';
import { TemplateProps } from './template.type';
import { useLocation } from 'react-router';
import { useTemplate } from '../../hooks';

export const Template: React.FC<TemplateProps> = (props): JSX.Element => {

  const { pathname } = useLocation();
  const { template, fallback } = useTemplate(props.name);
  const Content: React.FC<TemplateProps> = (props): JSX.Element => <props.component {...props} />;
  const components: Record<string, any> = { Content, Link, ...Nav };

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
      jsx={fallback} />
  }, [pathname]);

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', props.name);
  }, []);

  return <Suspense fallback={jsxFallback}>{jsxTemplate}</Suspense>;
};
