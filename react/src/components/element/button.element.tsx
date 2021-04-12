import React from 'react';
import { ButtonProps } from './element.type';

export const Button: React.FC<ButtonProps> = ({ type, props, children, onClick }) => {

  const handleClick = (): void => {
    if (onClick) {
      onClick(props);
    }
  }

  return React.createElement(`${type}`, { ...props, onClick: handleClick }, children);
}
