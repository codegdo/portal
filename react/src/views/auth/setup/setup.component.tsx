import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Form } from '../../../components/form/form.component';
import { FormType } from '../../../components/types';
import { mapNav, mapTemplate, normalizeData } from '../../../helpers';
import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { splitObjectKeyId } from '../../../utils';

interface FetchOutput {
  username: string;
}

const Setup: React.FC = (): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const { updateSession, updateLayout, updateNav } = useAction();
  const { fetching, result, isMounted, fetchData } = useFetch<FetchOutput>('api/auth/setup');
  const [form, setForm] = useState<FormType>();

  // initial load form
  useEffect(() => {
    void (async () => {
      const json = await import('./setup.form.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })()
  }, []);

  // api response
  useEffect(() => {
    if (fetching == 'success') {
      if (isMounted.current) {
        const { orgId, templates, nav } = result.data;
        const layout = mapTemplate(templates);

        updateSession({ orgId });
        updateLayout({ ...layout });
        nav && updateNav(mapNav(nav));
      }
    }
  }, [fetching]);

  // submit form
  const handleSubmit = (values: { [key: string]: string }): void => {
    const { keyFields } = splitObjectKeyId(values);
    const option = {
      body: { ...keyFields }
    };

    console.log(keyFields);
    void fetchData({ option });
  }

  return (
    form == undefined ? <div>loading...</div> :
      (
        (loggedIn && orgId) ? <Redirect to="/" /> :
          <Form data={form} response={{ fetching, result }} onSubmit={handleSubmit}>
            <Form.Message />
            <Form.Header />
            <Form.Main />
            <Form.Footer />
            <Link to="/auth/logout">Logout</Link>
          </Form>
      )
  );
};

export default Setup;
