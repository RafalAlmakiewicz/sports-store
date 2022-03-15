import { useState } from "react";
import AddToCart from "./addToCart";
import Counter from "./counter";
import { Link } from "react-router-dom";
import { getImagePath } from "../utils";
import { Product } from "../types";
import { Redirect, useHistory, useParams } from "react-router";
import { useProducts } from "../contexts/productsContext";

const ProductDetails = () => {
  const { products } = useProducts();

  //const products = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const { id } = useParams<{ id: string }>();
  let product = products.find((product) => product._id === id);
  const history = useHistory();

  const handleClickCounter = (count: number) => () => setQuantity(count);

  if (!product) {
    return <Redirect to="/notFound" />;
  } else
    return (
      <div className="details">
        <Link className="details-back btn btn-primary" to="/">
          back
        </Link>
        {showNotification && (
          <AddToCart
            itemToAdd={{ ...product, quantity }}
            onClose={() => setShowNotification(false)}
          />
        )}
        <div className="details-image">
          <img src={getImagePath(product.name)} alt={product.name} />
        </div>
        <h2 className="details-name">{product.name}</h2>
        <p className="details-price">{product.price}$</p>

        <Counter
          className="details-counter"
          count={quantity}
          handleClick={handleClickCounter}
          min={1}
          max={product.stock}
        />
        <button
          className="details-cart btn btn-primary"
          onClick={() => setShowNotification(true)}
        >
          Add to cart
        </button>
        <p className="details-description">{product.description}</p>
      </div>
    );
};

export default ProductDetails;
