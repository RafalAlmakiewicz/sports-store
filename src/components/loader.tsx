import { useEffect, useState } from "react";
import { useProducts } from "../contexts/productsContext";
import { useActivities } from "../contexts/activitiesContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faSearch,
  faTrash,
  faEdit,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUserCircle, faSearch, faTrash, faEdit, faCamera);

const Loader = ({ children }: { children: JSX.Element }) => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const { products, getAllProducts } = useProducts();
  const { activities, getAllActivities } = useActivities();
  const [error, setError] = useState("");

  const initializeCart = () => {
    if (!localStorage.getItem("cart")) localStorage.setItem("cart", "[]");
  };

  const checkDataIsLoaded = () => {
    setDataIsLoaded(products.length > 0 && activities.length > 0);
  };

  const initializeData = () => {
    Promise.all([getAllProducts(), getAllActivities()]).catch((error) => {
      if (!error.response) {
        setError("Error: server did not respond.");
      } else setError(error.response.data);
    });
  };

  useEffect(() => {
    initializeCart();
    initializeData();
  }, []);

  useEffect(() => {
    checkDataIsLoaded();
  }, [products, activities]);

  const LoadingScreen = () => {
    return (
      <main>
        <h2>loading...(initially can take up to 30 seconds)</h2>
      </main>
    );
  };

  const errorScreen = () => {
    return (
      <main>
        <h2>{error}</h2>
      </main>
    );
  };

  return error ? errorScreen() : dataIsLoaded ? children : LoadingScreen();
};

export default Loader;
