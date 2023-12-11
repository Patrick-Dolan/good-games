import { useEffect, useState } from "react";
import LoadingAnimation from "../../assets/LoadingAnimation";

function Image({ url, image, classes, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [url]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <div>
      {isLoading && <LoadingAnimation />}
      {isError ? (
        <div className="text-center">Error loading image</div>
      ) : (
        <img
          src={url || image}
          className={classes}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isLoading ? "none" : "block" }}
        />
      )}
    </div>
  );
}

export default Image;
