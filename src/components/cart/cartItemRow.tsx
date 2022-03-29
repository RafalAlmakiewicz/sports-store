import Counter from "../reusable/counter/counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartItem } from "../../types";
import formatPrice from "../../utils/formatPrice";
import { useState } from "react";

interface CartItemRowProps {
  product: CartItem;
  handleRemove: (id: string) => void;
  handleQuantityChange: (id: string, quantity: number) => void;
}

const CartItemRow = ({
  product,
  handleRemove,
  handleQuantityChange,
}: CartItemRowProps) => {
  const [shouldFade, setShouldFade] = useState(false);
  const getSubtotal = () => formatPrice(product.price * product.quantity);

  const handleClick = (count: number) => () =>
    handleQuantityChange(product._id, count);

  return (
    <tr
      className={shouldFade ? "fade" : undefined}
      onAnimationEnd={() => handleRemove(product._id)}
    >
      <td>{product.name}</td>
      <td>{formatPrice(product.price)}</td>
      <td>
        <Counter
          count={product.quantity}
          handleClick={handleClick}
          min={1}
          max={product.stock}
        />
      </td>
      <td>{product.stock}</td>
      <td>{getSubtotal()}</td>
      <td>
        <button
          onClick={() => setShouldFade(true)}
          aria-label="remove from cart"
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
