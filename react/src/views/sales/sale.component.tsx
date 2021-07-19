import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks';
import { AppState } from '../../store/reducers';
import List from './sale.list';
import Program from './sale.program';

const data = [
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

  const orgId = useSelector((state: AppState) => state.session.orgId);

  const { fetching, result, fetchData } = useFetch<any>(
    `/api/sales?orgId=${orgId}`
  );
  const [programs, setPrograms] = useState(null);

  const { name } = props;

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
    <div>
      {
        name === 'sales' && <List {...props} programs={programs} />
      }
      {
        name === 'program' && <Program {...props} />
      }
    </div>
  ) : <div>loading...</div>;
};

export default Sale;
