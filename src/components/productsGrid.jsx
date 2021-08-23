import React, { useState } from "react";
import getProducts from "../getProducts";
import "../styles.css";
import { Link } from "react-router-dom";

const ProductsGrid = () => {
  const [products, setProducts] = useState(getProducts);

  return (
    <React.Fragment>
      <h1 style={{ width: "1000px", background: "red" }}>Products</h1>;
      <div class="container">
        {products.map((p) => (
          <Link to={`/product/${p.id}`}>
            <div className="card" key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.price}$</p>
              <p>{p.inStock ? "In Stock" : "Out of stock"}</p>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductsGrid;
