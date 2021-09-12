import React from "react";
import Input from "./Input";

const PriceRange = ({
  minPrice,
  maxPrice,
  onSelectMinPrice,
  onSelectMaxPrice,
}) => {
  return (
    <div>
      <Input
        type="number"
        value={minPrice}
        onChange={onSelectMinPrice}
        placeholder="Min"
      />
      <Input
        type="text"
        value={maxPrice}
        onChange={onSelectMaxPrice}
        placeholder="Max"
      />
    </div>
  );
};

export default PriceRange;
