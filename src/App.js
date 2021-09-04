import "./App.css";
import NavBar from "./components/navBar";
import ProductsGrid from "./components/productsGrid";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import ProductDetails from "./components/productDetails";
import Cart from "./components/cart";
import NotFound from "./components/notFound";
import Login from "./components/login";
import ProductForm from "./components/productForm";
import getCategories from "./getCategories";
import getActivities from "./getActivities";
import AdminPanel from "./components/adminPanel";
import { useEffect, useState } from "react";
import ApiCallMaker from "./ApiCallMaker";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);

  const endpoint = "http://localhost:3000/SportsStore/api";

  const productsApi = new ApiCallMaker(
    `${endpoint}/products`,
    products,
    setProducts
  );

  const activitiesApi = new ApiCallMaker(
    `${endpoint}/activities`,
    activities,
    setActivities
  );

  useEffect(async () => {
    async function fetchData() {
      await activitiesApi.get();
      await productsApi.get();
    }
    await fetchData();

  }, []);

  return (
    <div>
      <NavBar />

      <Switch>
        <Route
          path="/productForm/:id?"
          render={(props) => {
            return (
              <ProductForm
                activities={activities}
                product={
                  products.filter((p) => p._id === props.match.params.id)[0]
                }
                onCreateProduct={productsApi.create}
                onUpdateProduct={productsApi.update}
              {...props}
              />
            );
          }}
        />
        <Route
          path="/admin"
          render={(props) => (
            <AdminPanel
              products={products}
              onDeleteProduct={productsApi.delete}
              {...props}
            />
          )}
        />
              {...props}
            />
          )}
        />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/products" component={ProductsGrid} />
        <Route path="/cart" component={Cart} />
        <Route path="/notFound" component={NotFound} />
        <Route path="/login" component={Login} />
        <Redirect from="/" exact to="/products" />
        <Redirect to="/notFound" />
      </Switch>
    </div>
  );
}

export default App;
