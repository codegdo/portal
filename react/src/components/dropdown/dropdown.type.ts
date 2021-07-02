export type DropdownContextValue = {
  ddRef: React.MutableRefObject<null>;
  value: string | undefined;
  placeholder: string | undefined;
  isToggle: boolean;
  onToggle: () => void;
  dropdownChange: (e: React.ChangeEvent<HTMLElement>) => void;
};

export type DropdownProps = {
  value?: string;
  placeholder?: string,
  className?: string,
  onChange?: ((e: React.ChangeEvent<HTMLElement>) => void) | undefined;
};

export type DropdownToggleProps = {
  type?: string;
  className?: string;
};

export type DropdownValueProps = {
  type?: string;
  className?: string;
};


export type DropdownMenuProps = {
  type?: string;
  className?: string;
};

export type DropdownItemProps = {
  type?: string;
  className?: string;
};

export type DropdownOptionProps = {
  type?: string;
  className?: string;
};

export type DropdownIconProps = {
  className?: string;
  icon?: string;
  toggleIcon?: string;
};


