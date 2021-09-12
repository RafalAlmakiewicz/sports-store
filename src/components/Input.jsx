import React from "react";

const Input = ({ type, name, validation, defaultValue, value, onChange }) => {
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
      />
    </React.Fragment>
  );
};

export default Input;
