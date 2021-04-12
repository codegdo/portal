import { FieldType } from '../types';

export interface FieldProps {
  data: FieldType;
  value: string;
  error: string | undefined;
  onChange?: (target: { [key: string]: any }) => void;
}

export interface FieldContextValue {
  data: FieldType;
  value: string;
  error: string | undefined;
  onChange?: (target: { [key: string]: any }) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
