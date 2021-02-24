import { FieldType } from '../types';

export interface FieldProps {
  data: FieldType;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FieldContextValue {
  data: FieldType;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
