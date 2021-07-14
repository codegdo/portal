import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { AppState } from '../../../store/reducers';
import { useAction, useFetch, useMediaQuery } from '../../../hooks';
import { Form, FormType } from '../../../components/form';
import { mapNav, normalizeData } from '../../../helpers';
import { splitObjectKeyId } from '../../../utils';
import { storage } from '../../../services';
import { jwtToken } from '../../../app.config';
//import { Dropdown } from '../../../components/dropdown/dropdown.component';

export class LoginDto {
  username!: string;
  password!: string;
}

interface IResultData {
  user: { [key: string]: string };
  orgId: string | number;
  token: string;
  message: string;
}

const Login: React.FC = (): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const [form, setForm] = useState<FormType>();
  const { updateSession, updateNav } = useAction();
  const { fetching, result, isMounted, fetchData } = useFetch<IResultData>('api/auth/login');
  const navigate = useNavigate();
  const isPageWide = useMediaQuery('(min-width: 800px)');


  console.log(isPageWide);

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
    if (fetching == 'success' && result) {
      if (isMounted.current) {
        const { user, orgId, token, nav } = result.data;

        storage.setItem(jwtToken, token);
        updateSession({ loggedIn: true, user, orgId });
        nav && updateNav(mapNav(nav));
      }
    } else if (fetching == 'error') {
      if (result?.data?.message === 'Unactivated Account') {
        //history.push({ pathname: '/auth/resend', state: { result } });
        navigate('resend');
      }
    }
  }, [fetching]);

  // submit form
  const handleSubmit = (values: { [key: string]: string }): void => {
    const { keyFields } = splitObjectKeyId(values);
    const config = {
      option: { body: { ...keyFields } },
      detail: { username: keyFields.username }
    };

    if (fetching !== 'loading') {
      void fetchData(config);
    }
  }

  return loggedIn ? (orgId ? <Navigate to="/" /> : <Navigate to="setup" />) :
    (
      form == undefined ? <div>loading</div> :
        <Form data={form} response={{ fetching, result }} onSubmit={handleSubmit}>
          <Form.Message />
          <Form.Header />
          <Form.Main />
          <Form.Footer />
        </Form>
    );
};

export default Login;
