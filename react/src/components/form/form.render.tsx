import React, { Fragment } from 'react';

import { FormBlock, FormElement, FormField } from '.';
import { FormRenderProps } from '../types';
import { NormalizeElement } from './form.type';

export const FormRender: React.FC<FormRenderProps> = ({ data: obj }): JSX.Element | null => {
  const { data = [] } = obj;

  return <Fragment>
    {
      data.map((item: NormalizeElement) => {
        //
        switch (item.dataRole) {
          case 'block':
            return <FormBlock key={item.id} block={item} />
          case 'element':
            return <FormElement key={item.id} element={item} />
          case 'field':
          case 'component':
            return <FormField key={item.id} field={item} />
          default:
            return null;
        }
      })
    }
  </Fragment>
};