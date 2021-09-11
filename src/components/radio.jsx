import React from "react";
import withLabel from "./withLabel";

const Radio = ({ value, selectedValue, onChange, id, name }) => {
  return (
    <React.Fragment>
      <input
        type="radio"
        id={id}
        name={name}
        value={value || id}
        onChange={(e) => onChange(e.currentTarget.value)}
        checked={(value || id) === selectedValue}
      />
    </React.Fragment>
  );
};

export default withLabel(Radio, "id");
