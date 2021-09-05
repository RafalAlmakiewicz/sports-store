import React, { useEffect, useState } from "react";
import AddToCart from "./addToCart";
import Counter from "./counter";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {});

  return (
    <div>
      {showNotification && (
        <AddToCart
          itemToAdd={{ ...product, quantity }}
          onClose={() => setShowNotification(false)}
        />
      )}
      <h3>{product.name}</h3>
      <p>{product.price}$</p>
      <p>{product.stock}</p>
      <p>{product.activity.name}$</p>
      <p>{product.description}</p>
      <Counter count={quantity} set={setQuantity} min="1" max={product.stock} />
      <button onClick={() => setShowNotification(true)}>Add to cart</button>
    </div>
  );
};

export default ProductDetails;
