import React, { useEffect, useState } from "react";
import Counter from "./counter";

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  const handleQuantityChange = (quantity, id) => {
    const tempCart = [...cart];
    const product = tempCart.find((p) => p._id === id);
    const index = tempCart.indexOf(product);
    const tempProduct = { ...product };
    tempProduct.quantity = quantity;
    tempCart[index] = tempProduct;
    console.log(JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const handleRemove = (id) => {
    const tempCart = cart.filter((p) => p._id !== id);
    setCart(tempCart);
  };

  let total = 0;
  const getSubtotal = (price, quantity) => {
    const sub = price * quantity;
    total += sub;
    return sub;
  };

  return cart.length === 0 ? (
    "Cart is empty"
  ) : (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Stock</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>
              <Counter
                count={p.quantity}
                set={handleQuantityChange}
                min="1"
                max={p.stock}
                id={p._id}
              />
            </td>
            <td>{p.stock}</td>
            <td>{getSubtotal(p.price, p.quantity)}</td>
            <td>
              <button
                onClick={() => {
                  handleRemove(p._id);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>{total}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Cart;
