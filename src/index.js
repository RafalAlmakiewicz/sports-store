import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import "./styles/styles.scss";
import { UserProvider } from "./contexts/userContext";
import { ActivitiesProvider } from "./contexts/activitiesContext";
import { ProductsProvider } from "./contexts/productsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ActivitiesProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </ActivitiesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
