import React from "react";
import { firstLetterToUpper } from "../utils";

const Input = ({ name, type, defaultValue, validation }) => {
  return (
    <div>
      <label htmlFor={name}>{firstLetterToUpper(name)}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        {...validation}
      />
    </div>
  );
};

export default Input;
