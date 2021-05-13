import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Form } from '../../../components/form/form.component';
import { FormType } from '../../../components/types';
import { normalizeData } from '../../../helpers';
import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { splitObjectKeyId } from '../../../utils';

interface FetchOutput {
  username: string;
}

const Configure: React.FC = (): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const { fetching, response, isMounted, fetchData } = useFetch<FetchOutput>('api/auth/configure');
  const [form, setForm] = useState<FormType>();

  // initial load form
  useEffect(() => {
    (async () => {
      const json = await import('./configure.form.json');
      const formData = normalizeData(json.default);
      setForm(formData);
    })()
  }, []);

  // api response
  useEffect(() => {
    if (fetching == 'success') {
      if (isMounted.current) {
        updateSession({ orgId: 1 });
      }
    }
  }, [fetching]);

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
        (loggedIn && orgId) ? <Redirect to="/" /> :
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