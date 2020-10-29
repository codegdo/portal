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

  const component = route.component || 'notfound.component.tsx';

  const MainComponent = lazy(
    () => import(`../../views/${component}`)
  );

  console.log(MainComponent);

  return (
    <Suspense fallback={null}>
      <JsxParser
        bindings={{}}
        components={{ MainComponent, NavMain }}
        jsx={`<MainComponent /> <NavMain />`}
      />
    </Suspense>
  );
};
