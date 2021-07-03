import React from 'react';
import { Link } from 'react-router-dom';

export const ALink: React.FC = ({ children }): JSX.Element => {
  return (
    <span className="avatar">
      {children}
    </span>
  );
}