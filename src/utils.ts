import { AxiosError } from "axios";
import images from "./images/images";
import { Product } from "./types";

export const firstLetterToUpper = (s: string) =>
  s.charAt(0).toUpperCase() + s.substring(1);

export const sortProducts = (
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

export const filterProducts = (
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

export const paginate = <T>(
  items: T[],
  pageSize: number,
  currentPage: number
) => {
  const index = pageSize * (currentPage - 1);
  const page = items.slice(index, index + pageSize);
  return page;
};

export const getPageCount = (itemsCount: number, pageSize: number) =>
  Math.ceil(itemsCount / pageSize);

const imageStorage =
  "https://res.cloudinary.com/assets-7791/image/upload/v1646864310/Sportify/";
const imageFormat = ".jpg";

/*export const getImagePath = (productName) => {
  return imageStorage + productName.replace(/ /g, "") + imageFormat;
};*/

export const getImagePath = (productName: string) => {
  return (images as { [prop: string]: string })[productName.replace(/ /g, "")];
};

export const matchesPriceFormat = (value: string) => {
  return !!value.match(/^\d*\.\d{2}$/);
};

export const matchesInteger = (value: string) => {
  return !!value.match(/^\d*$/);
};

export const formatPrice = (value: string) => {
  value = padEndZerosToDecimalPart(value, 2);
  return (+value).toFixed(2);
};

export const padEndZerosToDecimalPart = (value: string, max: number) => {
  if (value.split(".").length === 1) value += ".";
  return value.split(".")[0] + "." + value.split(".")[1].padEnd(max, "0");
};

export const removeLeadingZeros = (value: number) => {
  return +value.toString().replace(/^0+/, "");
};

export const formatInteger = (value: string) => {
  return removeLeadingZeros(Math.round(+value));
};

export const tryRequest = async (request: Function, args?: unknown) => {
  try {
    await request(args);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (!axiosError.response) {
      return "Error: server did not respond.";
    } else return axiosError.response.data;
  }
  return "";
};
