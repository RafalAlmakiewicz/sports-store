import Counter from "./counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartItem } from "../types";

interface CartItemRowProps {
  product: CartItem;
  handleRemove: (id: string) => React.MouseEventHandler<HTMLButtonElement>;
  handleQuantityChange: (id: string, quantity: number) => void;
}

const CartItemRow = ({
  product,
  handleRemove,
  handleQuantityChange,
}: CartItemRowProps) => {
  const getSubtotal = () => `${product.price * product.quantity}$`;

  const handleClick = (count: number) => () =>
    handleQuantityChange(product._id, count);

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
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
        <button onClick={handleRemove(product._id)} data-testid="cart-delete">
          <FontAwesomeIcon icon="trash" />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
