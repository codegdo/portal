import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';
interface HomeOutput {
  message: string;
}
const HomeComponent: React.FC = (): JSX.Element => {
  const { fetching, data, fetchData } = useFetch<HomeOutput>('/api');

  // initial load form
  useEffect(() => {
    (async () => {
      fetchData();
    })()
  }, []);

  // api response
  useEffect(() => {
    if (fetching == 'success' && data) {
      console.log(data);
    }
  }, [fetching]);

  return (
    <div>
      Home Router <Link to="/auth/logout">Logout</Link>
    </div>
  );
};

export default HomeComponent;
