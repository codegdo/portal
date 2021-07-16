import React, { useEffect } from 'react';
import { Route, Routes, useLocation, Link, Outlet, useParams, NavLink, Navigate, useNavigate } from 'react-router-dom';

import Dashboard from './dashboard/dashboard.component';
import Deal from './deals/deal.component';
import DealForm from './deals/deal.form';
import NotFound from '../notfound.component';

const programs = [
  {
    id: "1",
    name: "Deal Registration",
    description: null,
    programtype: "DR"
  },
  {
    id: "2",
    name: "Special Pricing",
    description: null,
    programtype: "SPA"
  }
]

const Sale: React.FC<{ name: string }> = (props): JSX.Element => {

  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const { programId } = useParams();

  // get programs
  useEffect(() => {
    if (programId !== undefined) {
      if (programs.filter(p => p.id === programId).length == 0) {
        navigate('not-found');
      }
    }

    console.log('STATE', state);
  }, [])

  return (
    <div>
      {
        props.name == 'sales' && <div>
          SALES
          <ul>
            {
              programs.map((program) => {
                const { id, name, programtype } = program;

                if (programtype?.toLowerCase() === pathname?.substring(1) || props.name === pathname?.substring(1)) {
                  return <li key={id}><Link to={`${id}`} state={{ program }} >{name}</Link></li>
                }

                return null;
              })
            }
          </ul>
        </div>
      }

      {
        props.name == 'program' && <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard {...props} />} />
          <Route path="deals*" element={<Outlet />}>
            <Route path="/" element={<Deal />} />
            <Route path=":id" element={<DealForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      }

    </div>
  );
};

export default Sale;
