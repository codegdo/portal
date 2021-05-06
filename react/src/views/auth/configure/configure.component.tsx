import React, { useEffect, useState } from 'react';
import { Form } from '../../../components/form/form.component';
import { FormType } from '../../../components/types';
import { normalizeData } from '../../../helpers';
import { useFetch } from '../../../hooks';
import { splitObjectKeyId } from '../../../utils';

interface FetchOutput {
  username: string;
}

const Configure: React.FC = (): JSX.Element => {
  const { fetching, response, fetchData } = useFetch<FetchOutput>('api/auth/signup');
  const [form, setForm] = useState<FormType>();

  // initial load form
  useEffect(() => {
    (async () => {
      const json = await import('./configure.form.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })()
  }, []);

  // submit form
  const handleSubmit = (values: { [key: string]: any }) => {
    const [keyFields] = splitObjectKeyId(values);
    const option = {
      body: { ...keyFields }
    };

    fetchData({ option });
  }

  return (
    form == undefined ? <div>loading</div> :
      (
        (fetching == 'success' && response) ? <div>Success</div> :
          <Form data={form} response={response} onSubmit={handleSubmit}>
            <Form.Message />
            <Form.Header />
            <Form.Main />
            <Form.Footer />
          </Form>
      )
  );
};

export default Configure;
