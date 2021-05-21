import React, { useContext } from 'react';
import { Message } from '../element/message.element';
import { FormContext } from './form.component';

export const FormMessage: React.FC = (): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { form: { errors }, response: { fetching, result } } = context;

  const { ok, data = {} } = result || {};

  console.log('form message', errors);

  return fetching == 'loading' ? <div>loading...</div> :
    (result ? <Message type={(ok ? "success" : "error")} text={data.message}>{data.message}</Message> : null)

}