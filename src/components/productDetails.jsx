import React, { useEffect, useState } from "react";
import AddToCart from "./addToCart";
import Counter from "./counter";
import images from "../images/images";
import { Link } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {});

  return (
    <div className="details">
      <Link className="details-back btn btn-primary" to="/">
        back
      </Link>
      {showNotification && (
        <AddToCart
          itemToAdd={{ ...product, quantity }}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="details-image">
        <img
          src={images[product.name.replaceAll(" ", "")]}
          alt={product.name}
        />
      </div>
      <h2 className="details-name">{product.name}</h2>
      <p className="details-price">{product.price}$</p>

      <Counter
        className="details-counter"
        count={quantity}
        set={setQuantity}
        min="1"
        max={product.stock}
      />
      <button
        className="details-cart btn btn-primary"
        onClick={() => setShowNotification(true)}
      >
        Add to cart
      </button>
      <p className="details-description">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
