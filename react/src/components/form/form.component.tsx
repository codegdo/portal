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

export const FormContext = React.createContext<FormContextValue | undefined>(undefined);

export const Form: React.FC<FormProps> & FormExtends = ({ data, response, onSubmit, children }) => {
  const { values: defaultValues, errors, formValidationSchema } = normalizeForm(data);

  let { current: values } = useRef(defaultValues);
  //let { current: errors } = useRef(defaultErrors);
  let errorRef = useRef(false);
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    registerSchema(formValidationSchema);
  }, []);

  useEffect(() => {
    if (status === 'submit') {

      errorRef.current = true;

      if (Object.keys(errors).length == 0) {

        // formValidationSchema
        validate(`${data.name}${data.id}`, values).then((errs) => {
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

  if (response) {
    if (response.ok) {
      errorRef.current = false;
    } else {
      errorRef.current = true;
    }
  }

  console.log(status);

  return (
    <form className={errorRef.current ? 'form -error' : 'form'}>
      <FormContext.Provider value={{ data, values, errors, formValidationSchema, response, status, onClick }}>
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