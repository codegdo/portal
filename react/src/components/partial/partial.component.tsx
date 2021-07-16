import React, { Suspense, useLayoutEffect } from "react";

export const Partial = (Component: React.FC<{ name: string }>) => (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & { name: string }): JSX.Element => {

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', props.name);
  }, [props.name]);

  return (<Suspense fallback={<div>loading...</div>}>
    <Component {...props} />
  </Suspense>)
};