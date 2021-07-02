import React from 'react';
import { useSelector } from 'react-redux';

export const Avatar: React.FC = ({ children }): JSX.Element => {
  const { session: { user } } = useSelector((state: AppState) => state);
  const { url } = user || {};
  return (
    <span className="avatar">
      {children ? children : (url ? <img src="" alt="avatar" /> : <i className="icon">account_circle</i>)}
    </span>
  );
}