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
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const [form, setForm] = useState<FormType>();
  const { updateSession } = useAction();
  const { fetching, result, isMounted, fetchData } = useFetch<FetchOutput>('api/auth/login');

  // initial load form
  useEffect(() => {
    void (async () => {
      const json = await import('./login.form.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })();
  }, []);

  // api response
  useEffect(() => {
    if (fetching == 'success') {
      if (isMounted.current) {
        const { user, orgId, token } = result.data || {};
        storage.setItem(jwtToken, token);
        updateSession({ loggedIn: true, user, orgId });
      }
    }
  }, [fetching]);

  // submit form
  const handleSubmit = (values: { [key: string]: any }) => {
    const [keyFields] = splitObjectKeyId(values);
    const config = {
      option: { body: { ...keyFields } },
      setting: { username: keyFields.username }
    };

    if (fetching !== 'loading') {
      void fetchData(config);
    }
  }

  return loggedIn ? (orgId ? <Redirect to="/" /> : <Redirect to="/auth/configure" />) :
    (
      result && result.data.message === 'Unactivated Account' ? <Redirect to={{ pathname: '/auth/resend', state: { result } }} /> :
        (
          form == undefined ? <div>loading</div> :
            <Form data={form} response={{ fetching, result }} onSubmit={handleSubmit}>
              <Form.Message />
              <Form.Header />
              <Form.Main />
              <Form.Footer />
            </Form>
        )
    );
};

export default Login;
