import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsGrid from "./productsGrid";
import SearchBox from "./searchBox";

const Products = ({ products }) => {
  const [searchString, setSearchString] = useState("");

  const handleSearch = (value) => {
    setSearchString(value);
  };

  const getProductsToDisplay = () => {
    let productsToDisplay = products.filter((p) =>
      p.name.toLowerCase().includes(searchString.toLowerCase())
    );
    console.log("in get", productsToDisplay);
    return productsToDisplay;
  };

  return (
    <React.Fragment>
      <SearchBox value={searchString} onSearch={handleSearch} />
      <ProductsGrid products={getProductsToDisplay()} />
    </React.Fragment>
  );
};

export default Products;
