import React from "react";

const PriceRange = ({
  minPrice,
  maxPrice,
  onSelectMinPrice,
  onSelectMaxPrice,
}) => {
  return (
    <div>
      <input
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => {
          onSelectMinPrice(e.currentTarget.value);
        }}
      />
      <input
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => {
          onSelectMaxPrice(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default PriceRange;
