import React from "react";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = ({ id, label, name, ...restProps }: InputProps) => {
  return (
    <div>
      <label htmlFor={id || name}>{label || name}</label>
      <textarea id={id || name} name={name} {...restProps} />
    </div>
  );
};

export default TextArea;
