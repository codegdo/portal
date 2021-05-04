import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import VerifyError from './verify.error';
import VerifySuccess from './verify.success';

const Verify: React.FC = (): JSX.Element => {

  const { params: { token } } = useRouteMatch();
  const { fetching, response, isMounted, fetchData } = useFetch(`/api/auth/verify/${token}`);

  useEffect(() => {
    void fetchData();
  }, []);

  return fetching == 'success' ?
    <VerifySuccess data={response} /> :
    (fetching == 'error' ? <VerifyError data={response} /> : <div>loading...</div>);
}

export default Verify;