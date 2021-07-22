import React, { Suspense, useLayoutEffect } from "react";

export const Partial = (Component: React.FC<{ page: string }>) => (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & { page: string }): JSX.Element => {

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', props.page);
  }, [props.page]);

  return (<Suspense fallback={<div>loading...</div>}>
    <Component {...props} />
  </Suspense>)
};