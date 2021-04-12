import React from 'react';
import { MessageProps } from './element.type';

export const Message: React.FC<MessageProps> = ({ type, children }): JSX.Element => {

  return (
    <div className={`message _${type}`}>
      {children}
    </div>
  );
}