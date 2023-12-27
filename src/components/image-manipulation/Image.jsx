import { useState } from "react";
import LoadingAnimation from "../../assets/LoadingAnimation";

function Image({ url, image, classes, loadClasses, alt, styleObj }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const displayStyle = {display: isLoading ? "none" : "block"};

  return (
    <>
      {isLoading && <LoadingAnimation classes={loadClasses} />}
      {isError ? (
        <div className="text-center">Error loading image</div>
      ) : (
        <img
          src={url || image}
          className={classes}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ ...displayStyle, ...styleObj }}
        />
      )}
    </>
  );
}

export default Image;
