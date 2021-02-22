import React, { useContext } from 'react';
import { FormContextValue, FormElementProps } from './form.type';
import { FormContext } from './form.component';

export const FormElement: React.FC<FormElementProps> = ({ element }): JSX.Element | null => {
  const { callback }: FormContextValue = useContext(FormContext);

  console.log(callback);
  const { } = element;

  return <div>element</div>
};