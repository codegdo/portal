import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FormContext } from './form.component';

export const FormFooter: React.FC = () => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { data: { buttons }, response: { fetching }, onClick } = context;

  return (
    <footer className="form-footer">
      {
        buttons.map(({ id, type, name, value }) => {
          switch (type) {
            case 'button':
              return <div key={id} className={`item item_${name}`}>
                <button className="button" type="button" name={name} disabled={(fetching == 'loading') ? true : false} onClick={() => onClick && onClick(name)}>{value}</button>
              </div>
            default:
              if (name == 'signup') {
                return <div key={id} className="item item_signup">
                  <span>{value} <Link to="/auth/signup">Signup</Link></span>
                </div>
              } else if (name == 'register') {
                return <div key={id} className="item item_register">
                  <span>{value} <Link to="/auth/register">Register</Link></span>
                </div>
              } else if (name == 'login') {
                return <div key={id} className="item item_login">
                  <span>{value} <Link to="/auth/login">Login</Link></span>
                </div>
              } else if (name == 'recovery') {
                return <div key={id} className="item item_recovery">
                  <span>{value} <Link to="/auth/recovery">Forgot password?</Link></span>
                </div>
              } else {
                return null;
              }
          }
        })
      }
    </footer>
  )
}