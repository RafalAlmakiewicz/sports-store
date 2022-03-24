import { Link } from "react-router-dom";
import { Product } from "../../types";
import { getImagePath } from "../../utils";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product._id}>
          <Link to={`/products/${product._id}`}>
            <div className="product-image">
              <img src={getImagePath(product.name)} alt={product.name} />
            </div>
            <p>{product.name}</p>
            <p className="product-price">{product.price}$</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
