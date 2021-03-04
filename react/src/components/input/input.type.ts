import { FieldType } from '../types';

export interface InputProps {
  data: FieldType;
  value: string;
  onChange?: (value: string) => void;
}

export interface InputContextValue {
  input: FieldType;
  value: string;
  onChange?: (value: string) => void;
}
