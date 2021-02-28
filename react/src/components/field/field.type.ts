import { FieldType } from '../types';

export interface FieldProps {
  data: FieldType;
  value: string;
  error: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FieldContextValue {
  data: FieldType;
  value: string;
  error: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
