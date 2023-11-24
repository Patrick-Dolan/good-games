import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import ImageCropperModal from "../image-manipulation/ImageCropperModal";

function UploadProfilePhoto() {
  const { user } = useFirebaseAuth();
  const [blobPhotoURL, setBlobPhotoURL] = useState(user?.photoURL);
  const [file, setFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const handleCloseModal = () => {
    setShowCropModal(false);
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setBlobPhotoURL(URL.createObjectURL(file));
      setShowCropModal(true);
    }
  }

  return (
    <div>
      <img src={user?.photoURL ? user.photoURL : blobPhotoURL} alt="" />
      <input 
        type="file" 
        id="photo" 
        name="photo"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handlePhotoChange}
      />
      <p>Note: Gifs will be turned into still images using their first frame.</p>
      {showCropModal && 
        <ImageCropperModal 
          photoURL={blobPhotoURL}
          closeModal={handleCloseModal}
          setPhotoURL={setBlobPhotoURL}
          setFile={setFile}
        />
      }
    </div>
  )
}

export default UploadProfilePhoto