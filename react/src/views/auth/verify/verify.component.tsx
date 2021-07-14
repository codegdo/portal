import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import VerifyError from './verify.error';
import VerifySuccess from './verify.success';

const Verify: React.FC = (): JSX.Element => {

  const { params: { token } } = useParams();
  const { fetching, result, fetchData } = useFetch(`/api/auth/verify/${token}`);

  useEffect(() => {
    void fetchData();
  }, []);

  return fetching == 'success' ?
    <VerifySuccess data={result} /> :
    (fetching == 'error' ? <VerifyError data={result} /> : <div>loading...</div>);
}

export default Verify;