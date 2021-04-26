import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export const SelectForm: React.FC = (): JSX.Element => {

  const match = useRouteMatch();

  return (
    <ul>
      <li><Link to={`${match.url}/partner`}>Partner</Link></li>
      <li><Link to={`${match.url}/internal`}>Internal</Link></li>
    </ul>
  )
}