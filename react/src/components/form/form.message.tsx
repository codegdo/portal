import React, { useContext } from 'react';
import { Message } from '../element/message.element';
import { FormContext } from './form.component';

export const FormMessage: React.FC = (): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { response: { fetching, result } } = context;

  const { ok, data } = result || {};

  return fetching == 'loading' ? <div>loading...</div> :
    (result && data?.message ? <Message type={(ok ? "success" : "error")}>{data.message}</Message> : null)

}