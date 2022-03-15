import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router";
import ApiCaller from "../ApiCaller";
import { apiEndpoint } from "../apiEndpoint";
import { Product } from "../types";

interface ProductsContext {
  products: Product[];
  getAllProducts: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (product: Product) => void;
  createProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const productsContext = createContext<ProductsContext>({} as ProductsContext);

export const useProducts = () => useContext(productsContext);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const productsApi = useRef(new ApiCaller<Product>(`${apiEndpoint}/products`));
  const history = useHistory();

  const getAllProducts = () => {
    productsApi.current.getAll().then((products) => {
      setProducts(products);
    });
  };

  const createProduct = (product: Product) => {
    productsApi.current.create(products, product).then((products) => {
      setProducts(products);
    });
    history.push("/admin");
  };

  const updateProduct = (product: Product) => {
    productsApi.current.update(products, product).then((products) => {
      setProducts(products);
    });
    history.push("/admin");
  };

  const deleteProduct = (id: string) => {
    productsApi.current.delete(products, id).then((products) => {
      setProducts(products);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
