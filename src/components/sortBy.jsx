import React from "react";
import DropDownList from "./dropDownList";
import RadioGroup from "./radioGroup";
import withLabel from "./withLabel";

const SortBy = ({ order, sortBy, onChangeOrder, onSort }) => {
  const DropDownWithLabel = withLabel(DropDownList, "name");

  return (
    <div>
      <RadioGroup
        buttons={[{ id: "ascending" }, { id: "descending" }]}
        name="order"
        selectedValue={order}
        onChange={onChangeOrder}
      />
      <DropDownWithLabel
        name="sort by"
        items={[{ name: "price" }, { name: "name" }]}
        valueProp="name"
        textProp="name"
        value={sortBy}
        onSelect={onSort}
      />
    </div>
  );
};

export default SortBy;
