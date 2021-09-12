import React from "react";

const Input = ({
  type,
  name,
  validation,
  defaultValue,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <React.Fragment>
      <input
        type={type}
        id={name}
        name={name}
        {...validation}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange && ((e) => onChange(e.currentTarget.value))}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default Input;
