import Image from "../reusable/Image";
import getImagePath from "../../utils/getImagePath";

interface ProductImageProps {
  productName: string;
}

function ProductImage({ productName }: ProductImageProps) {
  const src = getImagePath(productName);
  return <Image src={src ? src : ""} alt={productName} />;
}

export default ProductImage;
