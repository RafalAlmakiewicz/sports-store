const filterProducts = (
  allProducts: any[],
  minPrice: number,
  maxPrice: number,
  activityId: string,
  searchString: string
) => {
  let products = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchString.toLowerCase())
  );
  if (activityId)
    products = products.filter((p) => p.activity._id === activityId);
  if (minPrice) products = products.filter((p) => p.price >= minPrice);
  if (maxPrice) products = products.filter((p) => p.price <= maxPrice);
  return products;
};

export default filterProducts;
