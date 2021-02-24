import React, { useContext } from 'react';

import { FormContext } from './form.component';

export const FormFooter: React.FC = () => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { data: { buttons }, onClick } = context;

  return (
    <footer>
      {
        buttons.map(({ id, dataType, name, value }) => {
          return <button key={id} type={dataType} name={name} onClick={() => onClick && onClick(name)}>{value}</button>
        })
      }
    </footer>
  )
}