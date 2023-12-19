import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import DefaultPFP from "./../../assets/DefaultPFP.png";
import ImageCropperModal from "../image-manipulation/ImageCropperModal";
import { uploadProfilePicture } from "../../../firebaseFunctions";
import Surface from "../layout/Surface";

// TODO compress image before uploading

function UploadProfilePhoto({toggleProfileUpdate, handleToast}) {
  const { user, setUser } = useFirebaseAuth();
  const [blobPhotoURL, setBlobPhotoURL] = useState(user?.photoURL);
  const [file, setFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const handleCloseModal = () => {
    setFile(null);
    setBlobPhotoURL(user?.photoURL);
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

  const handleUploadProfilePhoto = async () => {
    if (file === null || file === undefined) { return }
  
    try {
      await uploadProfilePicture(user, setUser, file);
      toggleProfileUpdate();
      handleToast("success", "Profile photo successfully updated.");
    } catch (e) {
      handleToast("error", e.message);
    }
  }

  return (
    <Surface elevation="elevation-1">
      <img
        src={blobPhotoURL ? blobPhotoURL : user?.photoURL ? user?.photoURL : DefaultPFP}
        alt=""
        className="margin-center profile-picture"
      />
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
    
      <div className="row">
        <button onClick={toggleProfileUpdate}>Cancel</button>
        <button onClick={handleUploadProfilePhoto}>Upload new picture</button>
      </div>
    </Surface>
  )
}

export default UploadProfilePhoto