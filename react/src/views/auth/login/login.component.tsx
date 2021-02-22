import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppState } from '../../../store/reducers';
import { useAction, useFetch } from '../../../hooks';
import { Form, FormRender as render, FormType } from '../../../components/form';
import { normalizeData } from '../../../utils';


interface LoginOutput {
  user: {};
}

const Login: React.FC = (): JSX.Element => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);
  const [form, setForm] = useState<FormType>();
  const { updateSession } = useAction();
  const { status, data, fetchData } = useFetch<LoginOutput>('/auth/login');

  // initial load form
  useEffect(() => {
    (async () => {
      const json = await import('./login.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })()
  }, []);

  // api response
  useEffect(() => {
    if (status == 'success' && data) {
      updateSession({ loggedIn: true, user: data.user });
    }
  }, [status]);

  // submit form
  const handleSubmit = () => {
    fetchData({
      body: {}
    });
  }

  return loggedIn ? <Redirect to="/" /> :
    (
      form == undefined ? <div>loading</div> :
        <Form data={form} onSubmit={handleSubmit}>
          <Form.Header />
          <Form.Main>
            {
              render({ data: form })
            }
          </Form.Main>
          <Form.Footer />
        </Form>
    );
};

export default Login;
