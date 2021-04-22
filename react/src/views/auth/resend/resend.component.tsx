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
  const { search, state } = useLocation<LocationState>();

  const { fetching, response = state.response, data, fetchData } = useFetch<FetchOutput>('api/auth/resend');
  const [form, setForm] = useState<FormType>();



  // initial load form
  useEffect(() => {
    void (async () => {
      const json = await import('./resend.form.json');
      const formData = normalizeData(json.default);

      //
      if (search) {
        const parsed = queryString.parse(search);
        formData.fields[0].value = parsed.username;
      }

      //
      if (state && state.response && state.response.setting) {
        formData.fields[0].value = state.response.setting.username;
      }

      console.log(location);

      setForm(formData);
    })()
  }, []);

  // submit form
  const handleSubmit = (values: { [key: string]: any }) => {
    const [keyFields] = splitObjectKeyId(values);
    const config = {
      option: { body: { ...keyFields } },
      setting: { clear: true }
    };
    fetchData(config);
  }

  return (
    form == undefined ? <div>loading</div> :
      (
        fetching == 'success' ? <Redirect to={{ pathname: '/auth/login', state: {} }} /> :
          <Form data={form} response={response} onSubmit={handleSubmit}>
            <Form.Message />
            <Form.Header />
            <Form.Main />
            <Form.Footer />
          </Form>
      )
  )
}

export default Resend;