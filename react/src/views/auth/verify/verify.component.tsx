import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useFetch } from '../../../hooks';

const Verify: React.FC = (): JSX.Element => {

  const { params: { token } } = useRouteMatch();
  const { fetching, fetchData } = useFetch(`/api/auth/verify/${token}`, { init: true });

  useEffect(() => {
    void fetchData();
  }, [])

  return <div>verify</div>
}

export default Verify;