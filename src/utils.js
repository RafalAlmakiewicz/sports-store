export const firstLetterToUpper = (s) =>
  s.charAt(0).toUpperCase() + s.substring(1);

export const sortProducts = (products, orderName, sortBy) => {
  const order = orderName === "ascending" ? 1 : -1;

  switch (sortBy) {
    case "price":
      products.sort((a, b) => (a.price - b.price) * order);
      break;
    case "name":
      products.sort((a, b) => {
        if (a.name > b.name) return order;
        if (a.name < b.name) return -order;
        return 0;
      });
      break;
  }
};
