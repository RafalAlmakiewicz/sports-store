import React, { useState } from "react";
import ActivityFilter from "./activityfilter";
import PriceRange from "./priceRange";
import ProductsGrid from "./productsGrid";
import SearchBox from "./searchBox";

const Products = ({ allProducts, activities }) => {
  const [searchString, setSearchString] = useState("");
  const [activity, setActivity] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleSearch = (value) => {
    setSearchString(value);
  };

  const handleSelectActivity = (value) => {
    setActivity(value);
  };

  const handleSelectMinPrice = (value) => {
    if (value >= 0) setMinPrice(value);
  };

  const handleSelectMaxPrice = (value) => {
    if (value >= 0) setMaxPrice(value);
  };

  const getProductsToDisplay = () => {
    let products = allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchString.toLowerCase())
    );
    if (activity)
      products = products.filter((p) => p.activity._id === activity);
    if (minPrice) products = products.filter((p) => p.price >= minPrice);
    if (maxPrice) products = products.filter((p) => p.price <= maxPrice);
    return products;
  };

  return (
    <React.Fragment>
      <SearchBox value={searchString} onSearch={handleSearch} />
      <ActivityFilter
        value={activity}
        onSelectActivity={handleSelectActivity}
        activities={activities}
      />
      <PriceRange
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSelectMinPrice={handleSelectMinPrice}
        onSelectMaxPrice={handleSelectMaxPrice}
      />
      <ProductsGrid products={getProductsToDisplay()} />
    </React.Fragment>
  );
};

export default Products;
