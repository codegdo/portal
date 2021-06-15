import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

import { Form } from '../../../components/form/form.component';
import { FormType } from '../../../components/types';
import { normalizeData } from '../../../helpers';
import { FetchConfig, useFetch } from '../../../hooks';
import { splitObjectKeyId } from '../../../utils';

type LocationState = {
  username: string;
}

const Resend: React.FC = (): JSX.Element => {
  const { search, state } = useLocation<LocationState>();

  const { fetching, result = state?.result, fetchData } = useFetch('api/auth/resend');

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
      if (state?.result?.detail) {
        formData.fields[0].value = state?.result?.detail?.username;
      }

      console.log(location);

      setForm(formData);
    })()
  }, []);


  // submit form
  const handleSubmit = (values: { [key: string]: string }) => {
    const { keyFields } = splitObjectKeyId(values);
    const config: FetchConfig = {
      option: { body: { ...keyFields } },
      detail: { clear: true }
    };

    void fetchData(config);
  }

  console.log(fetching);

  return (
    form == undefined ? <div>loading</div> :
      (
        <Form data={form} response={{ fetching, result }} onSubmit={handleSubmit}>
          <Form.Message />
          <Form.Header />
          <Form.Main />
          <Form.Footer />
        </Form>
      )
  )
}

export default Resend;