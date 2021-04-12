import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from "react-router-dom";
import queryString from 'query-string';

import { Form } from '../../../components/form/form.component';
import { FormType } from '../../../components/types';
import { normalizeData } from '../../../helpers';
import { useFetch } from '../../../hooks';
import { splitObjectKeyId } from '../../../utils';

type FetchOutput = {
  username: string;
}

type LocationState = {
  username: string;
}

const Resend: React.FC = (): JSX.Element => {
  const { fetching, data, fetchData } = useFetch<FetchOutput>('api/auth/resend');
  const [form, setForm] = useState<FormType>();

  const location = useLocation<LocationState>();

  // initial load form
  useEffect(() => {
    (async () => {
      const json = await import('./resend.form.json');
      const formData = normalizeData(json.default);

      //
      if (location.search) {
        const parsed = queryString.parse(location.search);
        formData.fields[0].value = parsed.username;
      }

      setForm(formData);
    })()
  }, []);

  // submit form
  const handleSubmit = (values: { [key: string]: any }) => {
    const [keyFields] = splitObjectKeyId(values);
    const configs = {
      options: { body: { ...keyFields } },
      settings: { clear: true }
    };
    fetchData(configs);
  }

  return (
    form == undefined ? <div>loading</div> :
      (
        (fetching == 'success' && data) ? <Redirect to={{ pathname: '/auth/login', state: {} }} /> :
          <Form data={form} response={data} onSubmit={handleSubmit}>
            <Form.Message />
            <Form.Header />
            <Form.Main />
            <Form.Footer />
          </Form>
      )
  )
}

export default Resend;