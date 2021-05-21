import React, { useCallback, useEffect, useRef, useState } from 'react';
import { registerSchema, validate } from 'class-validator';
import { normalizeForm } from '../../helpers';
import { FormFooter } from './form.footer';
import { FormHeader } from './form.header';
import { FormMain } from './form.main';
import { FormMessage } from './form.message';
import { FormContextValue, FormProps } from './form.type';

interface FormExtends {
  Header: typeof FormHeader;
  Main: typeof FormMain;
  Footer: typeof FormFooter;
  Message: typeof FormMessage;
}

export const FormContext = React.createContext<FormContextValue<any> | undefined>(undefined);

export const Form: React.FC<FormProps<any>> & FormExtends = ({ data, response, onSubmit, children }) => {

  const { values: defaultValues, errors, formSchema } = normalizeForm(data);
  const { current: values } = useRef(defaultValues);
  const errorRef = useRef(false);
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    registerSchema(formSchema);
  }, []);

  useEffect(() => {
    if (status === 'submit') {

      errorRef.current = true;

      if (Object.keys(errors).length == 0) {

        // formValidationSchema
        void validate(`${data.name}${data.id}`, values).then((errs) => {
          if (errs.length == 0) {
            //setError(false);
            //refError.current = false;
            onSubmit && onSubmit(values);
          }
        });
      }
    }

    return () => {
      setStatus(undefined);
    };

  }, [status]);

  // 
  const onClick = useCallback((name: string): void => {
    if (name === 'submit' || name === 'reset') {
      setStatus(name);
    }
  }, [status]);

  if (response && response.result) {
    if (response.result.ok) {
      errorRef.current = false;
    } else {
      errorRef.current = true;
    }
  }

  return (
    <form className={errorRef.current ? 'form -error' : 'form'}>
      <FormContext.Provider value={{ data, form: { values, errors, status, formSchema }, response, onClick }}>
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
Form.Message = FormMessage;