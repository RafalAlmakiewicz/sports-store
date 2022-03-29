import { Product } from "../types";

const sortProducts = (
  products: Product[],
  orderName: string,
  sortValue: string
) => {
  const order = orderName === "ascending" ? 1 : -1;

  switch (sortValue) {
    case "price":
      products.sort((a, b) => (a.price - b.price) * order);
      break;
    case "name":
      products.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return order;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -order;
        return 0;
      });
      break;
  }
};

export default sortProducts;
