//import images from "../images/images";

const imageStorage =
  "https://res.cloudinary.com/assets-7791/image/upload/v1646864310/Sportify/";
const imageFormat = ".jpg";

export const getImagePath = (productName: string) => {
  return imageStorage + productName.replace(/ /g, "") + imageFormat;
};

/*export const getImagePath = (productName: string) => {
  return (images as { [prop: string]: string })[productName.replace(/ /g, "")];
};*/

export default getImagePath;
