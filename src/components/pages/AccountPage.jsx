import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import AccountDetails from "../account/AccountDetails";
import DefaultPFP from "./../../assets/DefaultPFP.png";
import ProfileDetails from "../account/ProfileDetails";
import Surface from "../layout/Surface";
import Toast from "../dialogs/Toast";
import UploadProfilePhoto from "../account/UploadProfilePhoto";
import Image from "../image-manipulation/Image";

function AccountPage() {
  const { user } = useFirebaseAuth();
  const [authVerified, setAuthVerified] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showProfilePhotoUpdate, setShowProfilePhotoUpdate] = useState(false);
  const [toastMessage, setToastMessage] = useState("Message that component needs shown.");
  const [toastType, setToastType] = useState("error");

  useEffect(() => {
    if (authVerified) {
      // Auth timer for 1 hour on change.
      const oneHourInMilliseconds = 1000 * 60 * 60;
      setTimeout(() => {
        setAuthVerified(false);
      }, oneHourInMilliseconds)
    }
  }, [authVerified])

  const handleCloseToast = () => {
    setShowToast(false);
  }

  const handleToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  }

  const toggleProfileUpdate = () => {
    setShowProfilePhotoUpdate(!showProfilePhotoUpdate);
  }

  // TODO Refactor Details components to use grid instead of flex for 2 column setup.

  return (
    <>
      <div className="container">
        <div className="mb-1">
          {showProfilePhotoUpdate 
          ? (
            <UploadProfilePhoto 
              toggleProfileUpdate={toggleProfileUpdate}
              handleToast={handleToast}
            />
          ) 
          : (
            <Surface elevation="elevation-1">
              <Image 
                url={user?.photoURL}
                image={DefaultPFP}
                alt="A user profile picture or default if it hasn't been assigned"
                classes={"profile-picture margin-center"}
              />
              <p className="text-center">@{user?.displayName}</p>
              <button onClick={toggleProfileUpdate} className="margin-center">Change profile picture</button>
            </Surface>
          )}
        </div>
        <div className="mb-1">
          <AccountDetails 
            authVerified={authVerified}
            setAuthVerified={setAuthVerified}
            handleToast={handleToast}
          />
        </div>
        <div className="mb-1">
          <ProfileDetails 
            handleToast={handleToast}
          />
        </div>
      </div>
      <Toast 
        onCloseToast={handleCloseToast}
        show={showToast}
        message={toastMessage}
        type={toastType}
      />
    </>
  );
}

export default AccountPage;
