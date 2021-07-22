import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';

const Registration: React.FC<any> = (props): JSX.Element => {
  const { programId } = useParams();

  const { fetching, result, fetchData } = useFetch<any>(
    `/api/sales/registrations?programId=${programId}`
  );

  const [registrations, setRegistrations] = useState(null);

  useEffect(() => {
    if (fetching == 'success' && result) {
      setRegistrations(result.data);

      console.log(result)
    }
  }, [fetching])

  useEffect(() => {
    void fetchData();
  }, []);

  return registrations ? (
    <div>
      <Link to="new">New</Link>
      <ul>
        {
          registrations?.map((registration) => {
            const { id, regNumber } = registration;
            return <li key={id}><Link to={`${id}`}>{regNumber}</Link></li>
          })
        }
      </ul>
    </div>
  ) : <div>loading...</div>;
};

export default Registration;
