import { NormalizeBlockField } from '../types';

export interface InputProps {
  data: NormalizeBlockField;
  value: string;
  onChange?: (value: string) => void;
}

export interface InputContextValue {
  input: NormalizeBlockField;
  value: string;
  onChange?: (value: string) => void;
}
