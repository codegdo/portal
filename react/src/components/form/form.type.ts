export interface FormType extends Partial<BlockType> {
  id: number;
  classId: string;
  name: string;
  title: string;
  description: string;

  css: { [x: string]: any };
  styles: string;

  buttons: any[];
  data: any[];
  fields: any[];
}

export interface BlockType {
  id: number;
  classId: string;
  name: string;
  type: string;
  dataType: string;
  dataRole: string;
  attribute: { [x: string]: any };
  value: string;
  data: NormalizeBlockField[] | string;
  position: number;
  mapToParent: number;
}

export interface FieldType extends BlockType {
  label: string;
  description: string;
  text: string;
  caption: string;
  placeholder: string;

  maxLength: number;
  parentId: any;

  isRequired: boolean;
  isReadonly: boolean;
}

export type NormalizeBlockField = FormType | BlockType | FieldType;

export interface FormContextValue {
  data: FormType;
  form: { string: string };
  submitted: boolean;
  onClick?: (name: string) => void;
}

export interface FormProps {
  data: FormType;
  onSubmit?: <T>(args: T) => void;
}

export interface FormRenderProps {
  data: NormalizeBlockField;
}

export interface FormBlockProps {
  block: BlockType;
}

export interface FormElementProps {
  element: BlockType;
}

export interface FormFieldProps {
  field: FieldType;
}
