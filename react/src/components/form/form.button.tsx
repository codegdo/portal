import React, { useContext, Fragment } from 'react';
import { FormButtonProps, FormContextValue } from './form.type';
import { FormContext } from './form.component';
import { Button } from '../element';


export const FormButton: React.FC<FormButtonProps> = ({ data }) => {
  const { callback }: FormContextValue = useContext(FormContext);
  const { buttons = [] } = data;

  const handleCallback = (button: {}): void => {
    callback(button);
  }

  return (
    <>
      {
        buttons.map((button, i) => {
          const { type, role: name, value } = button;

          return <Fragment key={i}>
            {
              (() => {
                return <Button type={type} props={{ name, type }} onClick={handleCallback}>{value}</Button>
              })()
            }
          </Fragment>
        })
      }
    </>
  )
}