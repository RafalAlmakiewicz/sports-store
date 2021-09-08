import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityFilter from "./activityfilter";
import ProductsGrid from "./productsGrid";
import SearchBox from "./searchBox";

const Products = ({ products, activities }) => {
  const [searchString, setSearchString] = useState("");
  const [activity, setActivity] = useState("");

  const handleSearch = (value) => {
    setSearchString(value);
  };

  const handleSelectActivity = (value) => {
    setActivity(value);
  };

  const getProductsToDisplay = () => {
    let productsToDisplay = products.filter((p) =>
      p.name.toLowerCase().includes(searchString.toLowerCase())
    );
    if (activity) {
      productsToDisplay = productsToDisplay.filter(
        (p) => p.activity._id === activity
      );
    }
    console.log("in get", productsToDisplay);
    return productsToDisplay;
  };

  return (
    <React.Fragment>
      <SearchBox value={searchString} onSearch={handleSearch} />
      <ActivityFilter
        value={activity}
        onSelectActivity={handleSelectActivity}
        activities={activities}
      />
      <ProductsGrid products={getProductsToDisplay()} />
    </React.Fragment>
  );
};

export default Products;
