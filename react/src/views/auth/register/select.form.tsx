import React from 'react';
import { Link } from 'react-router-dom';

export const SelectForm: React.FC = (): JSX.Element => {

  return (
    <ul>
      <li><Link to="partner">Partner</Link></li>
      <li><Link to="internal">Internal</Link></li>
    </ul>
  )
}