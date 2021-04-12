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
  const { fetching, data, fetchData } = useFetch<FetchOutput>('api/auth/signup');
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
  const handleSubmit = (values: { [key: string]: any }) => {
    const [keyFields] = splitObjectKeyId(values);
    const options = {
      body: { ...keyFields }
    };

    fetchData({ options });
  }

  return (
    form == undefined ? <div>loading</div> :
      (
        (fetching == 'success' && data) ? <SignupSuccess data={data} /> :
          <Form data={form} response={data} onSubmit={handleSubmit}>
            <Form.Message />
            <Form.Header />
            <Form.Main />
            <Form.Footer />
          </Form>
      )
  );
};

export default Signup;
