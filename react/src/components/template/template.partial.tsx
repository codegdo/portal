import React, { Suspense, useLayoutEffect } from "react";
import { SaleProgramData } from "../../views/sales/sale.type";

type PartialProps = {
  page: string;
  program?: SaleProgramData;
}

export const Partial = (Component: React.FC<PartialProps>) => (props: PartialProps): JSX.Element => {

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', props.page);
  }, [props.page]);

  return (<Suspense fallback={<div>loading...</div>}>
    <Component {...props} />
  </Suspense>)
};