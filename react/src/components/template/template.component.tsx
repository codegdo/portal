import React, { Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Link, } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';

import * as Nav from '../nav';
import { useTemplate } from '../../hooks';

type TemplateProps = {
  page: string;
}

export const TemplateContext = React.createContext<any>(undefined);

export const Template = (Content: React.FC<TemplateProps>) => (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & TemplateProps): JSX.Element => {
  const { page } = props;
  const [program, setProgram] = useState('');
  const { template, fallback } = useTemplate(program, page);
  const components: Record<string, React.ComponentType<any> | React.ExoticComponent<any>> | undefined = { Content, Link, ...Nav };

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, [program, page]);

  const jsxFallback = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      jsx={fallback} />
  }, [page]);

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', page);
  }, [page]);

  return <Suspense fallback={jsxFallback}>
    <TemplateContext.Provider value={{ setProgram }}>
      {jsxTemplate}
    </TemplateContext.Provider>
  </Suspense>;
};
