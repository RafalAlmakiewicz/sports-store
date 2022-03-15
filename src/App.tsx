import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faSearch,
  faTrash,
  faEdit,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import Main from "./components/main";
import { useProducts } from "./contexts/productsContext";
import { useActivities } from "./contexts/activitiesContext";
import LoadingMessage from "./components/loadingMessage";
library.add(faUserCircle, faSearch, faTrash, faEdit, faCamera);

const App = () => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const { products } = useProducts();
  const { activities } = useActivities();

  const initializeCart = () => {
    if (!localStorage.getItem("cart")) localStorage.setItem("cart", "[]");
  };

  const checkDataIsLoaded = () => {
    if (products.length > 0 && activities.length > 0) setDataIsLoaded(true);
  };

  useEffect(() => {
    initializeCart();
  }, []);

  useEffect(() => {
    checkDataIsLoaded();
  }, [products, activities]);

  return (
    <>
      <Header />
      {dataIsLoaded ? <Main /> : <LoadingMessage />}
      <Footer />
    </>
  );
};

export default App;
