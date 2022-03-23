import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import { ProductsProvider } from "./contexts/productsContext";
import { ActivitiesProvider } from "./contexts/activitiesContext";
import { ApiProvider } from "./contexts/apiContext";
import { UserProvider } from "./contexts/userContext";
import Loader from "./components/loader";
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
