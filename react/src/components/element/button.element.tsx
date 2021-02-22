import React, { FunctionComponent } from 'react';
import { ButtonComponentProps } from './element.type';

export const Button: FunctionComponent<ButtonComponentProps> = ({ type, props, children, onClick }) => {

  const handleClick = (): void => {
    if (onClick) {
      onClick(props);
    }
  }

  return React.createElement(`${type}`, { ...props, onClick: handleClick }, children);
}
