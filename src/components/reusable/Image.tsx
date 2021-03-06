import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProps) {
  const [error, setError] = useState(false);

  if (error) return <FontAwesomeIcon icon="file-image" />;
  return <img src={src} alt={alt} onError={() => setError(true)} />;
}

export default Image;
