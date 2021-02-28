import React, { useEffect, useState } from 'react';
import { normalizeForm, validateForm } from '../../helpers';
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
  const form = normalizeForm(data.fields);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (submitting) {
      //
      if (Object.keys(form.errors).length == 0) {
        onSubmit && onSubmit({});
      } else {
        const error = validateForm(form, data)

        if (!error) {
          onSubmit && onSubmit({});
        }
      }
    }

    return () => {
      setSubmitting(false);
    };
  }, [submitting]);

  // 
  const onClick = (name: string): void => {
    console.log(name);
    setSubmitting(true);
  }

  return (
    <form>
      <FormContext.Provider value={{ data, form, submitting, onClick }}>
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