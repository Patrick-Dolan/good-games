import { useParams } from "react-router";
import Surface from "../layout/Surface";
import { useEffect, useState } from "react";
import { getUserData } from "../../../firestoreFunctions";
import DefaultPFP from "./../../assets/DefaultPFP.png";


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
          <h3 className="text-center">Profile Loading...</h3>
        </Surface>
      </div>
    )
    : (
      <div className="container">
        <div className="mb-1">
          <Surface elevation="elevation-1">
            <div>
              <img
                src={userProfileData?.photoURL ? userProfileData.photoURL : DefaultPFP}
                alt="A user profile picture or default if it hasn't been assigned"
                className="profile-picture margin-center"
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