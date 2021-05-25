import { ValidationSchema } from 'class-validator';
import { FetchState } from '../../hooks';

export type FieldOption = {
  setting?: {
    showPassword?: boolean;
    isFocus?: boolean;
  };
  validation?: {
    strongPassword?: boolean;
    confirmPassword?: boolean;
  };
};

export type FormType = Partial<BlockType> & {
  id: number;
  classId: string;
  name: string;
  title: string;
  description: string;

  css: string;
  style: string;

  data: NormalizeElement[];
  buttons: NormalizeElement[];
  fields: NormalizeElement[];
};

export type BlockType = {
  id: number;
  classId: string;
  name: string;
  type: string;
  dataType: string;
  dataRole: string;
  option: string | FieldOption;
  value: string;
  data: NormalizeElement[];
  position: number;
  mapToParent: number;
};

export type FieldType = BlockType & {
  label: string;
  description: string;
  text: string;
  caption: string;
  placeholder: string;

  maxLength: number;
  parentId: number;
  mapTo: string;

  isRequired: boolean;
  isReadonly: boolean;
};

export type NormalizeElement = FormType & BlockType & FieldType;

export type FormData = {
  values: { [key: string]: string | number | boolean };
  errors: { [key: string]: string | number | boolean };
  status: string | undefined;
  formSchema: ValidationSchema;
};

export type FormContextValue<T> = {
  data: FormType;
  form: FormData;
  response: FetchState<T>;
  onClick?: (name: string) => void;
};

export type FormProps<T> = {
  data: FormType;
  response: FetchState<T>;
  onSubmit?: (args: T) => void;
};

export type FormRenderProps = {
  data: NormalizeElement;
};

export type FormBlockProps = {
  block: BlockType;
};

export type FormElementProps = {
  element: BlockType;
};

export type FormFieldProps = {
  field: FieldType;
};
