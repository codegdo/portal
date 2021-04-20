import React, { useContext } from 'react';
import { FormRender as render } from './form.render';
import { FormContext } from './form.component';

export const FormMain: React.FC = () => {

  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { data } = context;

  return (
    <main className="form-main">
      {
        render({ data })
      }
    </main>
  )
}