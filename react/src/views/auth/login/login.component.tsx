import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppState } from '../../../store/reducers';
import { useAction, useFetch } from '../../../hooks';
import { Form, FormType } from '../../../components/form';
import { normalizeData } from '../../../helpers';
import { splitObjectKeyId } from '../../../utils';
import { storage } from '../../../services';
import { jwtToken } from '../../../app.config';

export class LoginDto {
  username!: string;
  password!: string;
}

interface FetchOutput {
  user: {};
  token: string;
}

const Login: React.FC = (): JSX.Element => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);
  const [form, setForm] = useState<FormType>();
  const { updateSession } = useAction();
  const { status, data, fetchData } = useFetch<FetchOutput>('api/auth/login');

  // initial load form
  useEffect(() => {
    (async () => {
      const json = await import('./login.form.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })()
  }, []);

  // api response
  useEffect(() => {
    if (status == 'success' && data) {
      storage.setItem(jwtToken, data.token);
      updateSession({ loggedIn: true, user: data.user });
    }
  }, [status]);

  // submit form
  const handleSubmit = (values: { [key: string]: any }) => {
    //const fields = form === undefined ? [] : form.fields;
    //const x = mapField(fields, values);
    //console.log(x);

    const [fields] = splitObjectKeyId(values);

    fetchData({
      body: { ...fields }
    });

  }

  return loggedIn ? <Redirect to="/" /> :
    (
      form == undefined ? <div>loading</div> :
        <Form data={form} onSubmit={handleSubmit}>
          <Form.Header />
          <Form.Main />
          <Form.Footer />
        </Form>
    );
};

export default Login;
