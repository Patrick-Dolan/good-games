import { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utilities/CropImage';
import Modal from '../dialogs/Modal';

function ImageCropperModal({photoURL, closeModal, setPhotoURL, setFile}) {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  // Shows zoom percent value for title of slider
  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  }

  const cropImage = async () => {
    try {
      const {file, url} = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
      setFile(file);
      setPhotoURL(url);
      closeModal();
      // TODO add toast for success and fail
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Modal
      title="Crop Image"
      closeModal={closeModal}
    >
      <div style={{position: "relative", width: "auto", height: "40vh"}}>
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </div>
      <div>
        <div className="form__group">
          <label htmlFor="zoomInput">Zoom: {zoomPercent(zoom)}</label>
          <input
            type="range"
            id="zoomInput"
            name="zoomInput"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="rotationInput">Rotation: {rotation}</label>
          <input
            type="range"
            id="rotationInput"
            name="rotationInput"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={cropImage}>Crop Image</button>
      </div>
    </Modal>
  )
}

export default ImageCropperModal;