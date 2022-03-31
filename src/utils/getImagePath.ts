const imageStorage =
  "https://res.cloudinary.com/assets-7791/image/upload/v1646864310/Sportify/";
const imageFormat = ".jpg";

export const getImagePath = (productName: string) => {
  return imageStorage + productName.replace(/ /g, "") + imageFormat;
};

export default getImagePath;
