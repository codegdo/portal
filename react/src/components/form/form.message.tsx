import React, { useContext } from 'react';
import { Message } from '../element/message.element';
import { FormContext } from './form.component';

export const FormMessage: React.FC = (): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { response } = context;

  if (response) {
    console.log('form message', response);
    const { ok, data: { message, name } } = response;

    if (ok) {
      return <Message type={"success"} text={message || name}>{message || name}</Message>;
    }

    switch (status) {
      default:
        return <Message type={"error"} text={message || name}>{message || name}</Message>;
    }
  }

  return null;
}