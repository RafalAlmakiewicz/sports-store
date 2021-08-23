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
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {});

  const endpoint = "";

  const handleGetProducts = async () => {
    const { data: product } = await axios.get(endpoint);
    console.log(data);
  };

  const handleCreateProduct = async (product) => {
    const { data } = await axios.post(endpoint, product);
    console.log(data);
  };

  const handleUpdateProduct = async (product) => {
    const { data } = await axios.put(`${endpoint}/${product.id}`, product);
    console.log(data);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`${endpoint}/${id}`);
    console.log("deleted");
  };

 

  return (
    <div>
      <NavBar />

      <Switch>
        <Route
          path="/productForm/:id?"
          render={(props) => {
            const {id} = useParams()
            return (<ProductForm
              {...props}
              activities={getActivities()}
              product={...products.filter(p => p.id === id)}
            />)
          }}
        />
        <Route
          path="/admin"
          render={(props) => (
            <AdminPanel
              onGetProducts={handleGetProducts}
              onCreateProduct={handleCreateProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
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
