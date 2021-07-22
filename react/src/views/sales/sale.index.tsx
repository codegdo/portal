import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks';
import { AppState } from '../../store/reducers';

const Sale: React.FC<{ name: string }> = (props): JSX.Element => {

  const orgId = useSelector((state: AppState) => state.session.orgId);

  const { pathname } = useLocation();

  const { fetching, result, fetchData } = useFetch<any>(
    `/api/sales/programs?orgId=${orgId}`
  );
  const [programs, setPrograms] = useState(null);

  // fetch data
  useEffect(() => {
    void fetchData();
  }, []);

  // api response
  useEffect(() => {
    if (fetching == 'success' && result) {
      setPrograms(result.data);
      console.log('RESULT', result);
    } else if (fetching == 'error') {
      console.log('error');
    }
  }, [fetching]);

  return result ? (
    <ul>
      {
        programs?.map((program) => {
          const { id, name, programtype } = program;

          if (programtype?.toLowerCase() === pathname?.substring(1) || props.name === pathname?.substring(1)) {
            return <li key={id}><Link to={`${id}`}>{name}</Link></li>
          }

          return null;
        })
      }
    </ul>
  ) : <div>loading...</div>;
};

export default Sale;
