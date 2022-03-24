import React, { useState } from "react";
import ActivityFilter from "./activityfilter";
import PriceRange from "../reusable/priceRange";
import ProductsGrid from "./productsGrid";
import SearchBox from "../reusable/searchBox";
import SortBy from "./sortBy";
import {
  sortProducts,
  paginate,
  getPageCount,
  filterProducts,
} from "../../utils";
import ChangePage from "../reusable/changePage";
import { useProducts } from "../../contexts/productsContext";

const Products = ({ pageSize = 12 }) => {
  const { products: allProducts } = useProducts();

  const [state, setState] = useState({
    searchString: "",
    activityId: "",
    minPrice: 0,
    maxPrice: 0,
    sortValue: "name",
    sortOrder: "ascending",
    page: 1,
  });

  let filteredCount = 0;

  const handleChange =
    (prop: keyof typeof state) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target;
      if ((prop === "minPrice" || prop === "maxPrice") && +value < 0) return;
      setState({
        ...state,
        [prop]: value,
      });
    };

  const handleChangePage = (page: number) => () => {
    setState({
      ...state,
      page,
    });
  };

  const getProductsToDisplay = () => {
    let products = filterProducts(
      allProducts,
      state.minPrice,
      state.maxPrice,
      state.activityId,
      state.searchString
    );
    sortProducts(products, state.sortOrder, state.sortValue);
    filteredCount = products.length;
    products = paginate(products, pageSize, state.page);
    return products;
  };

  return (
    <div className="home">
      <div className="sidebar">
        <SearchBox
          value={state.searchString}
          handleChange={handleChange("searchString")}
        />
        <ActivityFilter
          value={state.activityId}
          handleChange={handleChange("activityId")}
        />
        <PriceRange
          minPrice={state.minPrice}
          maxPrice={state.maxPrice}
          handleChangeMinPrice={handleChange("minPrice")}
          handleChangeMaxPrice={handleChange("maxPrice")}
        />
        <SortBy
          order={state.sortOrder}
          value={state.sortValue}
          handleChangeOrder={handleChange("sortOrder")}
          handleChangeValue={handleChange("sortValue")}
        />
      </div>
      <ProductsGrid products={getProductsToDisplay()} />
      <ChangePage
        pageCount={getPageCount(filteredCount, pageSize)}
        currentPage={state.page}
        handleChange={handleChangePage}
      />
    </div>
  );
};

export default Products;
