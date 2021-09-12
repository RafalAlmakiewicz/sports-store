import React from "react";

const DropDownList = ({
  name,
  items,
  valueProp,
  textProp,
  validation,
  defaultValue,
  value,
  onSelect,
  textForFirstOption,
}) => {
  return (
    <React.Fragment>
      <select
        id={name}
        name={name}
        {...validation}
        defaultValue={defaultValue}
        value={value}
        onChange={onSelect && ((e) => onSelect(e.currentTarget.value))}
      >
        <option key="0" value="">
          {textForFirstOption}
        </option>
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
