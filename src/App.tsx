import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import Main from "./components/layout/main";
import { ProductsProvider } from "./contexts/productsContext";
import { ActivitiesProvider } from "./contexts/activitiesContext";
import { ApiProvider } from "./contexts/apiContext";
import { UserProvider } from "./contexts/userContext";
import Loader from "./components/layout/loader/loader";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ApiProvider>
        <UserProvider>
          <ActivitiesProvider>
            <ProductsProvider>
              <Header />
              <Loader>
                <Main />
              </Loader>
              <Footer />
            </ProductsProvider>
          </ActivitiesProvider>
        </UserProvider>
      </ApiProvider>
    </BrowserRouter>
  );
};

export default App;
