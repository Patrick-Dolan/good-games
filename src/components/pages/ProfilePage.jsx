import { useParams } from "react-router";
import Surface from "../layout/Surface";
import { useEffect, useState } from "react";
import { getUserData } from "../../../firebaseFunctions";
import DefaultPFP from "./../../assets/DefaultPFP.png";
import LoadingAnimation from "../../assets/LoadingAnimation";
import Image from "../image-manipulation/Image";


function ProfilePage() {
  const { userId } = useParams();
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await getUserData(userId);
      setUserProfileData(userData);
    }
    getUserInfo();
  }, []);

  return (
    !userProfileData
    ? (
      <div className="container">
        <Surface elevation="elevation-1">
          <LoadingAnimation />
          <h3 className="text-center">Profile Loading...</h3>
        </Surface>
      </div>
    )
    : (
      <div className="container">
        <div className="mb-1">
          <Surface elevation="elevation-1">
            <div>
              <Image 
                url={userProfileData?.photoURL}
                image={DefaultPFP}
                classes="profile-picture margin-center"
                alt="A user profile picture or default if it hasn't been assigned"
              />
              <p className="text-center">@{userProfileData?.displayName}</p>
              <hr />
              {userProfileData?.favoriteGame && <p>Favorite Game: {userProfileData?.favoriteGame}</p>}
              {userProfileData?.bio && <p>Bio: {userProfileData?.bio}</p>}
              {userProfileData?.createdAt && <p>Member Since: {userProfileData?.createdAt.toDate().getMonth()}/{userProfileData?.createdAt.toDate().getFullYear()}</p>}
            </div>
          </Surface>
        </div>
        <div className="mb-1">
          <Surface elevation="elevation-1">
            <h4>Favorite games shelf</h4>
            <hr />
            <p>*GAME THUMBNAILS GO HERE*</p>
          </Surface>
        </div>
        <Surface elevation="elevation-1">
          <h4>Games shelves</h4>
          <hr />
          <p>*SHELF LINKS HERE*</p>
        </Surface>
      </div>
    )
  )
}

export default ProfilePage;