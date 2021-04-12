import { ValidationSchema } from 'class-validator';

export type FormType = Partial<BlockType> & {
  id: number;
  classId: string;
  name: string;
  title: string;
  description: string;

  css: string;
  styles: string;

  buttons: any[];
  data: any[];
  fields: any[];
};

export type BlockType = {
  id: number;
  classId: string;
  name: string;
  type: string;
  dataType: string;
  dataRole: string;
  options: any;
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
  parentId: any;
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
