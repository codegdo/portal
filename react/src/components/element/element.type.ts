export interface TextboxComponentProps {
  attrs: { [x: string]: any };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ElementComponentProps {
  ref?: React.RefObject<HTMLDivElement>;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  focus?: string | null;
  type: any;
  value: any;
  attribute: { [x: string]: any };
}

export interface ButtonProps {
  type: any;
  onClick?: <T>(args: T) => void;
  props: {
    name: string;
    [x: string]: any;
  };
}

export interface SelectProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface HeaderProps {
  title?: string;
  description?: string;
}

export interface MessageProps {
  type: string;
}

export interface DisplayProps {
  type: string;
}
