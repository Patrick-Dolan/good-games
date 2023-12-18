import { useEffect, useState } from "react";
import Image from "./Image";
import LeftArrow from "../../assets/LeftArrow";
import RightArrow from "../../assets/RightArrow";
import LoadingAnimation from "../../assets/LoadingAnimation";

function ImageSlider({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
    }, 250)
  }, [])
  

  const showNextImage = () => {
    setImageIndex(index => {
      if (index === images.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  }

  const showPreviousImage = () => {
    setImageIndex(index => {
      if (index === 0) {
        return images.length - 1;
      } else {
        return index - 1;
      }
    });
  }

  return (
    <div className="image-slider__container">
      {fakeLoading 
        ? <LoadingAnimation /> 
        : (<div className="img-slider__inner-wrapper">
          <div className="image-slider__img-wrapper">
            {images.map((image, index) => (
              <Image 
                key={image}
                url={image}
                alt={`Game screenshot ${index + 1}`}
                classes="image-slider__img"
                styleObj={{ translate: `${-100 * imageIndex}%`}}
                aria-hidden={index !== imageIndex}
              />
            ))}
          </div>
          <button onClick={showPreviousImage} className="image-slider__button image-slider__button--left" aria-label="View previous image"><LeftArrow className="image-slider__button-icon" color="#61DAFB" /></button>
          <button onClick={showNextImage} className="image-slider__button image-slider__button--right" aria-label="View next image"><RightArrow className="image-slider__button-icon" color="#61DAFB" /></button>
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
      </div>)}
    </div>
  )
}

export default ImageSlider;