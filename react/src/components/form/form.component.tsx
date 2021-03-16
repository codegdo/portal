import React, { useEffect, useRef, useState } from 'react';
import { normalizeForm } from '../../helpers';
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
  const { values: formValues, errors: formErrors, validation } = normalizeForm(data);
  const { current: values } = useRef(formValues);
  const { current: errors } = useRef(formErrors);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      //
      if (Object.keys(errors).length == 0) {
        onSubmit && onSubmit(values);
      }
    }

    return () => {
      setSubmit(false);
    };
  }, [submit]);

  // 
  const onClick = (name: string): void => {
    if (name === 'Submit') {
      setSubmit(true);
    }
  }

  return (
    <form>
      <FormContext.Provider value={{ data, values, errors, validation, submit, onClick }}>
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