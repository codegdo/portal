import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SaleList: React.FC<any> = ({ programs, name: pagename }): JSX.Element => {

  const { pathname } = useLocation();

  return <ul>
    {
      programs.map((program) => {
        const { id, name, programtype } = program;

        if (programtype?.toLowerCase() === pathname?.substring(1) || pagename === pathname?.substring(1)) {
          return <li key={id}><Link to={`${id}`}>{name}</Link></li>
        }

        return null;
      })
    }
  </ul>;
};

export default SaleList;