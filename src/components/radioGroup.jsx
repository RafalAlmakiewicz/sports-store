import React from "react";
import Radio from "./radio";

const RadioGroup = ({ buttons, selectedValue, onChange, name }) => {
  return (
    <div>
      {buttons.map((b) => (
        <Radio
          key={b.id}
          id={b.id}
          value={b.value}
          name={name}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
