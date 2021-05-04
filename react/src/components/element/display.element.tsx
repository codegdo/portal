import React from 'react';
import { DisplayProps } from './element.type';

export const Display: React.FC<DisplayProps> = ({ type, children }): JSX.Element => {

  return (
    <div className={`display -${type}`}>
      {children}
    </div>
  );
}