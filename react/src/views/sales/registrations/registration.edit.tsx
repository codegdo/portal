import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';
import { useFetch } from '../../../hooks';
import { RegistrationProps } from '../sale.type';

const RegistrationEdit: React.FC<RegistrationProps> = (props): JSX.Element => {

  const location = useLocation();
  const { programId } = useParams();

  const { fetching, result, fetchData } = useFetch('api/sales/registrations');

  console.log(location);

  useEffect(() => {
    console.log(result);
  }, [result])

  const handleSubmit = () => {
    const config = {
      option: { body: { programId } }
    };

    if (fetching !== 'loading') {
      void fetchData(config);
    }
  }

  return <div>

    DEAL FORM

    <button onClick={handleSubmit}>Submit</button>

  </div>;
};

export default RegistrationEdit;
