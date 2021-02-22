import React, { useContext } from 'react';
import { FormContext } from './form.component';

export const FormHeader: React.FC = () => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { data: { title, description } } = context;

  return (
    <header>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}