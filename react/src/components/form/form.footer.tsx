import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FormContext } from './form.component';

export const FormFooter: React.FC = () => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { data: { buttons }, status, onClick } = context;

  return (
    <footer className="form-footer">
      {
        buttons.map(({ id, type, name, value }) => {
          switch (type) {
            case 'button':
              return <span key={id}>
                <button className="button" type="button" name={name} onClick={() => onClick && onClick(name)}>{value}</button>
              </span>
              break;
            case 'link':
              if (name == 'signup') {
                return <span key={id}>
                  Create a new org? <Link to="/auth/signup">Signup</Link>
                </span>
              } else if (name == 'login') {
                return <span key={id}>
                  Already has an account? <Link to="/auth/login">Login</Link>
                </span>
              }

              break;
            default:
              return null;
          }
        })
      }
    </footer>
  )
}