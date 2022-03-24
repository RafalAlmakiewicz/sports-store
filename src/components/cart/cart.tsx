import { useEffect, useState } from "react";
import { CartItem } from "../../types";
import CartItemRow from "./cartItemRow";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") as string) as CartItem[]
  );

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    body.classList.add("dark");
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  const handleQuantityChange = (id: string, quantity: number) => {
    const tempCart = [...cart];
    const product = tempCart.find((product) => product._id === id);
    if (!product) throw Error("product is missing from cart");
    const index = tempCart.indexOf(product);
    const tempProduct = { ...product };
    tempProduct.quantity = quantity;
    tempCart[index] = tempProduct;
    console.log(JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const handleRemove = (id: string) => () => {
    const tempCart = cart.filter((product) => product._id !== id);
    setCart(tempCart);
  };

  const getTotal = () => {
    let total = 0;
    for (let product of cart) {
      total += product.price * product.quantity;
    }
    return `${total}$`;
  };

  return cart.length === 0 ? (
    <h2>Cart is empty</h2>
  ) : (
    <div className="admin-panel">
      <h2>Cart</h2>
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
          {cart.map((product) => (
            <CartItemRow
              key={product._id}
              product={product}
              handleRemove={handleRemove}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
        </tbody>
      </table>
      <div className="cart-buy">
        <p>{getTotal()}</p>
        <button className="btn btn-secondary">Buy</button>
      </div>
    </div>
  );
};

export default Cart;
