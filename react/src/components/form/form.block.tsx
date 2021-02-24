import React, { } from 'react';
import { FormRender as render } from './form.render';
import { FormBlockProps } from './form.type';

export const FormBlock: React.FC<FormBlockProps> = ({ block }): JSX.Element | null => {

  const { type } = block;

  return React.createElement(
    `${type}`,
    null,
    render({ data: block })
  );
};