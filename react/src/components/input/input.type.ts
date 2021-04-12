import { FieldType } from '../types';

export type InputProps = {
  data: FieldType;
  value: string;
  onChange?: (target: TargetInput) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export type InputContextValue = {
  input: FieldType;
  value: string;
  onChange?: (target: TargetInput) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export type TargetInput = {
  [key: string]: any;
};
