import Products from "./products";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductDetails from "./productDetails";
import Cart from "./cart";
import NotFound from "./notFound";
import ProductForm from "./productForm";
import AdminPanel from "./adminPanel";
import UserForm from "./userForm";
import ProtectedRoute from "./protectedRoute";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/productForm/:id?">
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        </Route>
        <Route path="/admin">
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/login">
          <UserForm action="login" />
        </Route>
        <Route path="/register">
          <UserForm action="register" />
        </Route>
        <Route path="/cart" component={Cart} />
        <Route path="/notFound" component={NotFound} />
        <Redirect from="/" exact to="/products" />
        <Redirect to="/notFound" />
      </Switch>
    </main>
  );
};

export default Main;
