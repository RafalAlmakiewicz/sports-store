import React, { useState } from "react";
import getProducts from "../getProducts";
import "../styles.css";
import { Link } from "react-router-dom";

const ProductsGrid = ({ products }) => {
  return (
    <React.Fragment>
      <h1 style={{ width: "1000px", background: "red" }}>Products</h1>;
      <div className="container">
        {products.map((p) => (
          <Link to={`/product/${p._id}`}>
            <div className="card" key={p._id}>
              <h3>{p.name}</h3>
              <p>{p.price}$</p>
              <p>{p.stock > 0 ? "In Stock" : "Out of stock"}</p>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductsGrid;
