import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputContext } from './input.component';
import { RegexCheck, regexCheck, toCamelCase } from '../../utils';
import { FieldType } from '../form';
import { TargetInput } from './input.type';

export const InputPassword: React.FC = () => {
  const context = useContext(InputContext);

  const { input = {}, value = '', onChange, onBlur, onFocus } = context || {};
  const { name = '', id, dataType = 'text', text = '', options }: Partial<FieldType> = input;
  const keyId = toCamelCase(name + id);
  const { validation, setting } = options;

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [check, setCheck] = useState<RegexCheck>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    validation && validation.strongPassword && setCheck({ ...regexCheck(value) });
  }, [value]);

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: TargetInput = {
      [keyId]: event.target.value
    };

    if (null !== confirmRef.current) {

      if (validation) {
        target.validation = { ...validation };
        target.validation.confirmPassword = confirmRef.current.value;
      }
    }

    onChange && onChange(target);
  }

  const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {

    const target: TargetInput = {
      [keyId]: value
    };

    if (validation) {
      target.validation = { ...validation };
      target.validation.confirmPassword = event.target.value;
    }

    onChange && onChange(target)
  }

  const changeShowPassword = () => {
    setting && setting.showPassword && setShowPassword(!showPassword);
  }

  return (
    <>
      <span className={"input-" + dataType}>
        <input type={showPassword ? 'text' : 'password'} ref={passwordRef} value={value == null ? '' : value} onChange={(event) => changePassword(event)} onBlur={onBlur} onFocus={onFocus} />
        {validation && validation.confirmPassword && <span><input type={showPassword ? 'text' : 'password'} ref={confirmRef} placeholder="Confirm" onChange={(event) => changeConfirmPassword(event)} onBlur={onBlur} onFocus={onFocus} /></span>}
        {setting && setting.showPassword && <label><input type="checkbox" onChange={() => changeShowPassword()} /><small>Show password</small></label>}
        {text && <em className="description"><small>{text}</small></em>}
      </span>

      {
        validation && validation.strongPassword && <span className="input-hint">
          {check.lengthcase ? <small className="hint _checked">8 Characters</small> : <small className="hint">8 Characters</small>}
          {check.numbercase ? <small className="hint _checked">1 Number</small> : <small className="hint">1 Number</small>}
          {check.uppercase ? <small className="hint _checked">1 Uppercase letter</small> : <small className="hint">1 Uppercase letter</small>}
          {check.lowercase ? <small className="hint _checked">1 Lowercase letter</small> : <small className="hint">1 Lowercase letter</small>}
          {check.specialcase ? <small className="hint _checked">1 Special character !@#$&*</small> : <small className="hint">1 Special character !@#$&*</small>}
        </span>
      }
    </>
  )
}