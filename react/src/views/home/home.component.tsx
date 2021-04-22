import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';
interface HomeOutput {
  message: string;
}
const HomeComponent: React.FC = (): JSX.Element => {
  /**/
  const { fetching, response, fetchData } = useFetch<HomeOutput>('/api');

  // initial load form
  useEffect(() => {
    void (async (): Promise<void> => {
      await fetchData();
    })()
  }, []);

  // api response
  useEffect(() => {
    if (fetching == 'success' && response) {
      console.log(response);
    }
  }, [fetching]);

  return (
    <div>
      Home Router <Link to="/auth/logout">Logout</Link>
    </div>
  );
};

export default HomeComponent;
