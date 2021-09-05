import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AddToCart = ({ itemToAdd, onClose }) => {
  const getQuantity = (inCart, toAdd, stock) =>
    inCart + toAdd > stock ? stock : inCart + toAdd;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const itemInCart = cart.find((i) => i._id === itemToAdd._id);
    if (itemInCart) {
      itemInCart.quantity = getQuantity(
        itemInCart.quantity,
        itemToAdd.quantity,
        itemToAdd.stock
      );
    } else {
      cart.push({
        _id: itemToAdd._id,
        name: itemToAdd.name,
        price: itemToAdd.price,
        stock: itemToAdd.stock,
        quantity: getQuantity(0, itemToAdd.quantity, itemToAdd.stock),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  return (
    <div>
      <p>Item added to cart.</p>
      <Link to="/cart">Go to Cart</Link>
      <button onClick={onClose}>[X]</button>
    </div>
  );
};

export default AddToCart;
