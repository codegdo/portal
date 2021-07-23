import React, { useEffect, useState } from 'react';
import { Form } from '../../../components/form/form.component';
import { FormType } from '../../../components/types';
import { normalizeData } from '../../../helpers';
import { useFetch } from '../../../hooks';
import { splitObjectKeyId } from '../../../utils';
import SignupSuccess from './signup.success';

interface FetchOutput {
  username: string;
}

const Signup: React.FC = (): JSX.Element => {
  const { fetching, result, fetchData } = useFetch<FetchOutput>('api/auth/signup');
  const [form, setForm] = useState<FormType>();

  // initial load form
  useEffect(() => {
    (async () => {
      const json = await import('./signup.form.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })()
  }, []);

  // submit form
  const handleSubmit = (values: { [key: string]: string }) => {
    const { keyFields } = splitObjectKeyId(values);
    const option = {
      body: { ...keyFields }
    };

    fetchData({ option });
  }

  return (
    form == undefined ? <div>loading</div> :
      (
        (fetching == 'success' && result) ? <SignupSuccess data={result.data} /> :
          <Form data={form} response={{ fetching, result }} onSubmit={handleSubmit}>
            <Form.Message />
            <Form.Header />
            <Form.Main />
            <Form.Footer />
          </Form>
      )
  );
};

export default Signup;
