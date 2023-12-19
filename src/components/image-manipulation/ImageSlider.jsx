import { useEffect, useState } from "react";
import Image from "./Image";
import LeftArrow from "../../assets/LeftArrow";
import RightArrow from "../../assets/RightArrow";
import LoadingAnimation from "../../assets/LoadingAnimation";

function ImageSlider({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [fakeLoading, setFakeLoading] = useState(true);

  // TODO refactor fake loading to show loading state based on images being loaded

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
    }, 400)
  }, [])

  const handleShowNextImage = () => {
    setImageIndex(index => index === images.length - 1 ? 0 : index + 1);
  }

  const handleShowPreviousImage = () => {
    setImageIndex(index => index === 0 ? images.length - 1 : index - 1);
  }

  return (
    <div className="image-slider__container">
      <div className="img-slider__inner-wrapper">
        <div className="image-slider__img-wrapper">
          {fakeLoading 
            ? (
              <div className="img-slider__loading-container">
                <LoadingAnimation /> 
              </div>
            ) 
            : (
              images.map((image, index) => (
                <Image 
                  key={image}
                  url={image}
                  alt={`Game screenshot ${index + 1}`}
                  classes="image-slider__img"
                  styleObj={{ translate: `${-100 * imageIndex}%`}}
                  aria-hidden={index !== imageIndex}
                />
              ))
            )}
        </div>
        <button 
          onClick={handleShowPreviousImage} 
          className="image-slider__button image-slider__button--left" 
          aria-label="View previous image"
        >
          <LeftArrow className="image-slider__button-icon" />
        </button>
        <button 
          onClick={handleShowNextImage} 
          className="image-slider__button image-slider__button--right" 
          aria-label="View next image"
        >
          <RightArrow className="image-slider__button-icon" />
        </button>
        <div className="image-slider__lower-button-wrapper">
          {images.map((image, index) => (
            <button 
              key={image}
              onClick={() => setImageIndex(index)}
              className={"image-slider__lower-button"}
              aria-label={`View image {index + 1} of ${images.length}}`}
            >
              {index === imageIndex ? <p className="image-slider__lower-button-icon">●</p> : "○"}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider;