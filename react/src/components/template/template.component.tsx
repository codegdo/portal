import React, { Suspense, lazy } from 'react';
import JsxParser from 'react-jsx-parser';

import { RouteComponentData } from '../route/route.component';

import { NavMain } from '../nav/nav.partial';

export interface TemplateComponentProps {
  route: RouteComponentData;
}

export const TemplateComponent: React.FC<TemplateComponentProps> = ({
  route,
}): JSX.Element => {
  const MainComponent = lazy(
    () => import('../../views' + (route.component || '/notfound.component.tsx'))
  );

  return (
    <Suspense fallback={null}>
      {/* <JsxParser
        bindings={{}}
        components={{ MainComponent, NavMain }}
        jsx={`<MainComponent /> <NavMain />`}
      /> */}
      <MainComponent />
    </Suspense>
  );
};
