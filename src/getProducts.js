const Products = [
  { id: 1, name: "tennis racket", price: 200, inStock: true },
  { id: 2, name: "tennis ball", price: 20, inStock: true },
  { id: 3, name: "bowling ball", price: 60, inStock: true },
  { id: 4, name: "golf club", price: 500, inStock: true },
  { id: 5, name: "running shoes", price: 150, inStock: true },
  { id: 6, name: "tennis racket", price: 200, inStock: true },
  { id: 7, name: "tennis ball", price: 20, inStock: true },
  { id: 8, name: "bowling ball", price: 60, inStock: true },
  { id: 9, name: "golf club", price: 500, inStock: true },
  { id: 10, name: "running shoes", price: 150, inStock: true },
];

const getProducts = () => {
  for (const product of Products) {
    product.image = "https://picsum.photos/200";
  }
  return Products;
};

export const getProduct = (id) => Products.filter((p) => p.id === id);

export default getProducts;
