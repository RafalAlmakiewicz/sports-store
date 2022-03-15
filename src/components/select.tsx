import React from "react";

interface SelectProps {
  name: string;
  items: any[];
  valueProp: string;
  textProp: string;
  validation?: {};
  defaultValue?: string;
  value?: string;
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
  textForFirstOption?: string;
  label?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      items,
      valueProp,
      textProp,
      validation,
      defaultValue,
      value,
      handleChange,
      textForFirstOption,
      label,
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={name}>{label || name}</label>
        <select
          ref={ref}
          id={name}
          name={name}
          {...validation}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
        >
          <option key="0" value="">
            {textForFirstOption}
          </option>
          {items.map((item) => (
            <option key={item[valueProp]} value={item[valueProp]}>
              {item[textProp]}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
