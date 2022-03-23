import { createContext, useContext, useMemo } from "react";
import { Activity, Product } from "../types";
import EntityApi from "../api/EntityApi";
import { apiEndpoint } from "../apiEndpoint";
import authApi from "../api/authApi";
import resetDatabase from "../api/resetDbApi";

export interface ApiContext {
  productsApi: EntityApi<Product>;
  activitiesApi: EntityApi<Activity>;
  authApi: typeof authApi;
  resetDatabase: typeof resetDatabase;
}

export const apiContext = createContext<ApiContext>({} as ApiContext);

export const useApi = () => useContext(apiContext);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const value: ApiContext = useMemo(() => {
    return {
      productsApi: new EntityApi<Product>(`${apiEndpoint}/products`),
      activitiesApi: new EntityApi<Activity>(`${apiEndpoint}/activities`),
      authApi,
      resetDatabase,
    };
  }, []);

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};
