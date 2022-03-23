import { createContext, useContext, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Product } from "../types";
import { useApi } from "./apiContext";

interface ProductsContext {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getAllProducts: () => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const productsContext = createContext<ProductsContext>({} as ProductsContext);

export const useProducts = () => useContext(productsContext);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { productsApi } = useApi();
  const history = useHistory();

  const getAllProducts = async () => {
    let data = await productsApi.getAll();
    setProducts(data);
  };

  const createProduct = async (product: Product) => {
    let data = await productsApi.create(products, product);
    setProducts(data);
    history.push("/admin");
  };

  const updateProduct = async (product: Product) => {
    let data = await productsApi.update(products, product);
    setProducts(data);
    history.push("/admin");
  };

  const deleteProduct = async (id: string) => {
    let data = await productsApi.delete(products, id);
    setProducts(data);
  };

  const value = useMemo(() => {
    return {
      products,
      setProducts,
      getAllProducts,
      updateProduct,
      createProduct,
      deleteProduct,
    };
  }, [products]);

  return (
    <productsContext.Provider value={value}>
      {children}
    </productsContext.Provider>
  );
};
