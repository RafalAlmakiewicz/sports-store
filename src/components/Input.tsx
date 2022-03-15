import React from "react";

interface InputProps {
  id?: string;
  type: string;
  name?: string;
  validation?: {};
  defaultValue?: string | number;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  checked?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, label, name, validation, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label || name}</label>
      <input ref={ref} id={id || name} name={name} {...validation} {...rest} />
    </div>
  );
});

export default Input;
