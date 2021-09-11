import React from "react";

const DropDownList = ({
  name,
  items,
  valueProp,
  textProp,
  validation,
  value,
  onSelect,
}) => {
  return (
    <React.Fragment>
      <select
        {...validation}
        id={name}
        name={name}
        defaultValue={value}
        onChange={onSelect && ((e) => onSelect(e.currentTarget.value))}
      >
        <option key="0" value=""></option>
        {items.map((i) => (
          <option key={i[valueProp]} value={i[valueProp]}>
            {i[textProp]}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default DropDownList;
