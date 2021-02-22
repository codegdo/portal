import React, { useContext } from 'react';

import { FormContext } from './form.component';

export const FormFooter: React.FC = () => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { onClick } = context;

  return (
    <footer>
      <button type="button" onClick={onClick}>Submit</button>
    </footer>
  )
}