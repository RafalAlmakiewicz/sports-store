import { MemoryRouter } from "react-router-dom";
import { ActivitiesProvider } from "../contexts/activitiesContext";
import { ProductsProvider } from "../contexts/productsContext";
import { ApiProvider } from "../contexts/apiContext";
import Loader from "../components/layout/loader/loader";
import Main from "../components/layout/main";
import Header from "../components/layout/header/header";
import { UserProvider } from "../contexts/userContext";

interface TestEnvironmentProps {
  children?: JSX.Element;
  path?: string[];
}

const TestApp = ({ path, children }: TestEnvironmentProps) => {
  return (
    <MemoryRouter initialEntries={path}>
      <ApiProvider>
        <UserProvider>
          <ActivitiesProvider>
            <ProductsProvider>
              <Header />
              <Loader>{children || <Main />}</Loader>
            </ProductsProvider>
          </ActivitiesProvider>
        </UserProvider>
      </ApiProvider>
    </MemoryRouter>
  );
};

export default TestApp;
