import { useState } from "react";
import AddToCart from "./addToCart";
import Counter from "../reusable/counter/counter";
import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import { Redirect, useParams } from "react-router";
import { useProducts } from "../../contexts/productsContext";
import styles from "./productDetails.module.scss";
import ProductImage from "../productImage/productImage";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  let product = products.find((product) => product._id === id);

  const handleClickCounter = (count: number) => () => setQuantity(count);

  if (!product) {
    return <Redirect to="/notFound" />;
  } else
    return (
      <div className={styles.details}>
        <Link className={`${styles.back} btn btn-primary`} to="/">
          back
        </Link>
        {showNotification && (
          <AddToCart
            itemToAdd={{ ...product, quantity }}
            onClose={() => setShowNotification(false)}
          />
        )}
        <div className={styles.image}>
          <ProductImage productName={product.name} />
        </div>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>{formatPrice(product.price)}</p>

        <Counter
          className={styles.counter}
          count={quantity}
          handleClick={handleClickCounter}
          min={1}
          max={product.stock}
        />
        <button
          className={`${styles.cart} btn-primary`}
          onClick={() => setShowNotification(true)}
        >
          Add to cart
        </button>
        <p className={styles.description}>{product.description}</p>
      </div>
    );
};

export default ProductDetails;
