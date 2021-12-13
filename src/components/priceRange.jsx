import React from "react";
import Input from "./Input";

const PriceRange = ({
  minPrice,
  maxPrice,
  onSelectMinPrice,
  onSelectMaxPrice,
}) => {
  return (
    <div className="price-range">
      <label>
        min
        <Input
          type="number"
          value={minPrice}
          onChange={onSelectMinPrice}
          placeholder="Min"
        />
      </label>

      <label>
        max
        <Input
          type="text"
          value={maxPrice}
          onChange={onSelectMaxPrice}
          placeholder="Max"
        />
      </label>
    </div>
  );
};

export default PriceRange;
