import React, { useEffect, useState } from 'react';
import { normalizeForm } from '../../utils';
import { FormFooter } from './form.footer';
import { FormHeader } from './form.header';
import { FormMain } from './form.main';
import { FormContextValue, FormProps } from './form.type';

interface FormExtends {
  Header: typeof FormHeader;
  Main: typeof FormMain;
  Footer: typeof FormFooter;
}

export const FormContext = React.createContext<FormContextValue | undefined>(undefined);

export const Form: React.FC<FormProps> & FormExtends = ({ data, onSubmit, children }) => {

  const { form } = normalizeForm(data.fields);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      onSubmit && onSubmit({});
    }
    return () => setSubmitted(false);
  }, [submitted]);

  // 
  const onClick = (): void => {
    setSubmitted(true);
  }

  return (
    <form>
      <FormContext.Provider value={{ data, form, submitted, onClick }}>
        {
          children
        }
      </FormContext.Provider>
    </form>
  )
}

// extend props
Form.Header = FormHeader;
Form.Main = FormMain;
Form.Footer = FormFooter;