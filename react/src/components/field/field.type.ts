import { FieldType } from '../types';

export interface FieldProps {
  data: FieldType;
  value: string;
  error: string | undefined;
  onChange?: (value: string) => void;
}

export interface FieldContextValue {
  data: FieldType;
  value: string;
  error: string | undefined;
  onChange?: (value: string) => void;
}
