import { Link } from "react-router-dom";
import { Product } from "../../../types";
import formatPrice from "../../../utils/formatPrice";
import styles from "./productsGrid.module.scss";
import ProductImage from "../../productImage/productImage";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <div className={styles.product} key={product._id}>
          <Link to={`/products/${product._id}`}>
            <div className={styles.image}>
              <ProductImage productName={product.name} />
            </div>
            <p>{product.name}</p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
