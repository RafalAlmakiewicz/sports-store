import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}$</p>
      <p>{product.stock > 0 ? "In Stock" : "Out of stock"}</p>
      <p>{product.activity.name}$</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
