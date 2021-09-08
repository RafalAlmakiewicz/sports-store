import "./App.css";
import NavBar from "./components/navBar";
import Products from "./components/products";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductDetails from "./components/productDetails";
import Cart from "./components/cart";
import NotFound from "./components/notFound";
import ProductForm from "./components/productForm";
import AdminPanel from "./components/adminPanel";
import { useEffect, useState } from "react";
import ApiCallMaker from "./ApiCallMaker";
import UserForm from "./components/userForm";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Logout from "./components/logOut";

function App() {
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    async function fetchData() {
      await activitiesApi.get();
      await productsApi.get();
    }
    fetchData();

    localStorage.setItem("cart", "[]");

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const user = jwtDecode(token);
      setUser(user);
    } catch (ex) {}
  }, []);

  return (
    <div>
      <NavBar user={user} />

      <Switch>
        <Route
          path="/productForm/:id?"
          render={(props) => {
            return (
              <ProductForm
                activities={activities}
                product={products.find((p) => p._id === props.match.params.id)}
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
        <Route
          path="/product/:id"
          render={(props) => (
            <ProductDetails
              product={products.find((p) => p._id === props.match.params.id)}
              {...props}
            />
          )}
        />
        <Route
          path="/products"
          render={(props) => (
            <Products
              allProducts={products}
              activities={activities}
              {...props}
            />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <UserForm action="Login" endpoint={`${endpoint}/auth`} {...props} />
          )}
        />
        <Route
          path="/register"
          render={(props) => (
            <UserForm
              action="Register"
              endpoint={`${endpoint}/users`}
              {...props}
            />
          )}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/cart" component={Cart} />
        <Route path="/notFound" component={NotFound} />
        <Redirect from="/" exact to="/products" />
        <Redirect to="/notFound" />
      </Switch>
    </div>
  );
}

export default App;
