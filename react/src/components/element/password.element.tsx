import React from 'react';
import { PasswordProps } from './element.type';

export const PasswordStrength: React.FC<PasswordProps> = ({ value }): JSX.Element => {

  const uppercase = /(?=.*[A-Z])/.test(value);
  const lowercase = /(?=.*[a-z])/.test(value);
  const specialcase = /(?=.*[!@#$&*])/.test(value);
  const numbercase = /(?=.*[0-9])/.test(value);
  const lengthcase = /^(?=.*[a-zA-Z0-9!@#$&*]).{8,}$/.test(value);
  //const match = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(value);

  return (
    <span>
      {lengthcase ? <small style={{ color: 'green' }}>8 Characters</small> : <small>8 Characters</small>}
      {numbercase ? <small style={{ color: 'green' }}>1 Number</small> : <small>1 Number</small>}
      {uppercase ? <small style={{ color: 'green' }}>1 Uppercase letter</small> : <small>1 Uppercase letter</small>}
      {lowercase ? <small style={{ color: 'green' }}>1 Lowercase letter</small> : <small>1 Lowercase letter</small>}
      {specialcase ? <small style={{ color: 'green' }}>1 Special character !@#$&*</small> : <small>1 Special character !@#$&*</small>}
    </span>
  );
}