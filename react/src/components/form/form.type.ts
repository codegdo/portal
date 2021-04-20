import { ValidationSchema } from 'class-validator';

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

export type FormContextValue = {
  data: FormType;
  values: { [key: string]: string };
  errors: { [key: string]: string };
  response: any;
  status: string | undefined;
  formValidationSchema: ValidationSchema;
  onClick?: (name: string) => void;
};

export type FormProps = {
  data: FormType;
  response: any;
  onSubmit?: <T>(args: T) => void;
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
