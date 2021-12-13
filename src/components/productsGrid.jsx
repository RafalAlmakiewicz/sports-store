import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../images/images";

const ProductsGrid = ({ products }) => {
  console.log(images);
  return (
    <React.Fragment>
      <div className="products">
        {products.map((p) => (
          <div className="product" key={p._id}>
            <Link to={`/product/${p._id}`}>
              <div className="product-image">
                <img src={images[p.name.replaceAll(" ", "")]} alt={p.name} />
              </div>
              <p>{p.name}</p>
              <p class="product-price">{p.price}$</p>
            </Link>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductsGrid;
