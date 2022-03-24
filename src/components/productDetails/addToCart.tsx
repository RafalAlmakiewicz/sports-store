import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../types";

interface AddToCartProps {
  itemToAdd: CartItem;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const AddToCart = ({ itemToAdd, onClose }: AddToCartProps) => {
  const getQuantity = (inCart: number, toAdd: number, stock: number) =>
    inCart + toAdd > stock ? stock : inCart + toAdd;

  useEffect(() => {
    let cartJson = localStorage.getItem("cart");
    if (!cartJson) return;
    let cart = JSON.parse(cartJson) as CartItem[];

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
