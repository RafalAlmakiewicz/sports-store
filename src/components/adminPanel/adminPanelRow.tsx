import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatPrice from "../../utils/formatPrice";
import { Product } from "../../types";

interface AdminPanelRowProps {
  product: Product;
  handleDeleteProduct: (id: string) => Promise<void>;
}

const AdminPanelRow = ({
  product,
  handleDeleteProduct,
}: AdminPanelRowProps) => {
  const [shouldFade, setShouldFade] = useState(false);

  return (
    <tr
      className={shouldFade ? "fade" : undefined}
      onAnimationEnd={() => handleDeleteProduct(product._id)}
    >
      <td>{product.name}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.stock}</td>
      <td>{product.activity.name}</td>
      <td>
        <Link to={`/productForm/${product._id}`} aria-label="update product">
          <FontAwesomeIcon icon="edit" />
        </Link>
      </td>
      <td>
        <button
          aria-label="delete product"
          type="button"
          onClick={() => setShouldFade(true)}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      </td>
    </tr>
  );
};

export default AdminPanelRow;
