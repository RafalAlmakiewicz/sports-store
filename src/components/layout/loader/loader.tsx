import { useEffect, useState } from "react";
import { useProducts } from "../../../contexts/productsContext";
import { useActivities } from "../../../contexts/activitiesContext";
import styles from "./loader.module.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faSearch,
  faTrash,
  faEdit,
  faShoppingCart,
  faExclamation,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUserCircle,
  faSearch,
  faTrash,
  faEdit,
  faShoppingCart,
  faExclamation,
  faFileImage
);

const Loader = ({ children }: { children: JSX.Element }) => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const { products, getAllProducts } = useProducts();
  const { activities, getAllActivities } = useActivities();
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeData = () => {
      Promise.all([getAllProducts(), getAllActivities()]).catch((error) => {
        if (!error.response) {
          setError("Error: server did not respond.");
        } else setError(error.response.data);
      });
    };
    initializeData();
  }, []);

  useEffect(() => {
    const initializeCart = () => {
      if (!localStorage.getItem("cart")) localStorage.setItem("cart", "[]");
    };
    initializeCart();
  }, []);

  useEffect(() => {
    const checkDataIsLoaded = () => {
      setDataIsLoaded(products.length > 0 && activities.length > 0);
    };
    checkDataIsLoaded();
  }, [products, activities]);

  const LoadingScreen = () => {
    return (
      <main className={styles.loadingScreen}>
        <h2>loading...(initially can take up to 30 seconds)</h2>
        <div className={styles.animatedLoader}></div>
      </main>
    );
  };

  const errorScreen = () => {
    return (
      <main className={styles.loadingScreen}>
        <h2>{error}</h2>
      </main>
    );
  };

  return error ? errorScreen() : dataIsLoaded ? children : LoadingScreen();
};

export default Loader;
