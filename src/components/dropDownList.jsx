import React from "react";
import { firstLetterToUpper } from "../utils";

const DropDownList = ({
  name,
  items,
  valueProp,
  textProp,
  validation,
  defaultValue,
}) => {
  return (
    <div>
      <label htmlFor={name}>{firstLetterToUpper(name)}</label>
      <select {...validation} id={name} name={name} defaultValue={defaultValue}>
        <option key="0" value=""></option>
        {items.map((i) => (
          <option key={i[valueProp]} value={i[valueProp]}>
            {i[textProp]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownList;