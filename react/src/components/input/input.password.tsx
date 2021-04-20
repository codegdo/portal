import React, { useContext, useRef, useState } from 'react';
import { InputContext, TargetInput } from './';
import { FieldType } from '../form';
import { toCamelCase } from '../../utils';


export const InputPassword: React.FC = () => {
  const context = useContext(InputContext);

  const { input, value, onChange, onBlur, onFocus } = context || {};

  const { name, id, text, option }: Partial<FieldType> = input || {};

  const nameId = toCamelCase(`${name || ''}${id || ''}`);

  // option
  let strongPassword = false, showPassword = false, confirmPassword = false;

  if (typeof option === 'object') {
    const { validation, setting } = option;

    // validation
    strongPassword = validation?.strongPassword || false;
    confirmPassword = validation?.confirmPassword || false;

    // setting
    showPassword = setting?.showPassword || false;
  }

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  /*
  const [check, setCheck] = useState<RegexCheck>({});
  useEffect(() => {
    strongPassword && setCheck({ ...regexCheck(value || '') });
  }, [value]);
  */

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: TargetInput = {
      [nameId]: event.target.value,
      validation: {}
    };

    if (confirmPassword) {
      target.validation.confirmPassword = confirmRef.current && confirmRef.current.value

    }

    if (strongPassword) {
      target.validation.strongPassword = true
    }

    onChange && onChange(target);
  }

  const changeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: TargetInput = {
      [nameId]: value,
      validation: {}
    };

    if (confirmPassword) {
      target.validation.confirmPassword = event.target.value
    }

    onChange && onChange(target)
  }

  const changeShow = () => {
    showPassword && setShow(!show);
  }

  return (
    <>
      <span className={confirmPassword ? 'input-password -group' : 'input-password'}>
        <input
          type={show ? 'text' : 'password'}
          ref={passwordRef}
          value={value}
          onChange={changePassword}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {
          confirmPassword &&
          <input
            type={show ? 'text' : 'password'}
            ref={confirmRef}
            placeholder="Confirm"
            onChange={changeConfirm}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        }
      </span>
      {
        (text || showPassword) && <span className={showPassword ? 'input-description -group' : 'input-description'}>
          {
            text &&
            <span className="text"><small>{text}</small></span>
          }
          {
            showPassword &&
            <label className="checkicon">
              <input
                type="checkbox"
                onChange={changeShow}
              />
              <i className="icon -outlined -small">remove_red_eye</i>
            </label>
          }
        </span>
      }
      {
        /* strongPassword && <span className="input-hint">
          {<small className={check.lengthcase ? 'hint _checked' : 'hint'}>8 Characters</small>}
          {<small className={check.numbercase ? 'hint _checked' : 'hint'}>1 Number</small>}
          {<small className={check.uppercase ? 'hint _checked' : 'hint'}>1 Uppercase letter</small>}
          {<small className={check.lowercase ? 'hint _checked' : 'hint'}>1 Lowercase letter</small>}
          {<small className={check.specialcase ? 'hint _checked' : 'hint'}>1 Special character !@#$&*</small>}
        </span> */
      }
    </>
  )
}