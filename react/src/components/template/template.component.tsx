import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import { Link, } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';

import * as Nav from '../nav';
import { useTemplate } from '../../hooks';

export const Template = (Content: React.FC<{ name: string }>) => (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & { name: string }): JSX.Element => {

  const { name } = props;
  const { template, fallback } = useTemplate(name);
  const components: Record<string, any> = { Content, Link, ...Nav };

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, [name]);

  const jsxFallback = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      jsx={fallback} />
  }, [name]);

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', name);
  }, [name]);

  return <Suspense fallback={jsxFallback}>{jsxTemplate}</Suspense>;
};

/* export const Template: React.FC<TemplateProps> = (props): JSX.Element => {

  const { name } = props;
  const { template, fallback } = useTemplate(name);
  const Content: React.FC<TemplateProps> = (props): JSX.Element => <props.component {...props} />;
  const components: Record<string, any> = { Content, Link, ...Nav };

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, [name]);

  const jsxFallback = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      jsx={fallback} />
  }, [name]);

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', name);
  }, [name]);

  return <Suspense fallback={jsxFallback}>{jsxTemplate}</Suspense>;
}; */
