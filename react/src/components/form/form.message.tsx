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
    const { ok, status, message } = response;

    console.log('form message', message);

    if (ok) {
      return <Message type={"success"} text={message}>{message}</Message>;
    }

    switch (status) {
      default:
        return <Message type={"error"} text={message}>{message}</Message>;
    }
  }

  return null;
}