import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  items: any[];
  valueProp: string;
  textProp: string;
  textForFirstOption?: string;
}

const Select = ({
  items,
  valueProp,
  textProp,
  textForFirstOption,
  name,
  label,
  id,
  ...restProps
}: SelectProps) => {
  return (
    <div>
      <label htmlFor={id || name}>{label || name}</label>
      <select id={id || name} name={name} {...restProps}>
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
};

export default Select;
