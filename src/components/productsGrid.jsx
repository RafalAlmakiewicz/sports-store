import React, { useState } from "react";
import getProducts from "../getProducts";
import "../styles.css";
import { Link } from "react-router-dom";

const ProductsGrid = ({ products }) => {
  return (
    <React.Fragment>
      <div className="container">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <Link to={`/product/${p._id}`}>
              <h3>{p.name}</h3>
              <p>{p.price}$</p>
              <p>{p.stock > 0 ? "In Stock" : "Out of stock"}</p>
            </Link>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductsGrid;
