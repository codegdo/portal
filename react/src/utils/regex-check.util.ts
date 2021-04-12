export interface RegexCheck {
  uppercase?: boolean;
  lowercase?: boolean;
  specialcase?: boolean;
  numbercase?: boolean;
  lengthcase?: boolean;
}

export function regexCheck(value: string): RegexCheck {
  const uppercase = /(?=.*[A-Z])/.test(value);
  const lowercase = /(?=.*[a-z])/.test(value);
  const specialcase = /(?=.*[!@#$&*])/.test(value);
  const numbercase = /(?=.*[0-9])/.test(value);
  const lengthcase = /^(?=.*[a-zA-Z0-9!@#$&*]).{8,}$/.test(value);
  //const match = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(value);

  return {
    uppercase,
    lowercase,
    specialcase,
    numbercase,
    lengthcase,
  };
}
