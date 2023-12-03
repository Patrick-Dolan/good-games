import { useState } from "react";
import Surface from "../layout/Surface";
import { useFirebaseAuth } from "../../context/AuthContext";
import { updateUserDBEntry } from "../../../firebaseFunctions";

function ProfileEdit({closeEditForm, handleToast}) {
  const { user, setUser } = useFirebaseAuth();
  const [profileInfoForm, setProfileInfoForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    favoriteGame: user?.favoriteGame || "",
    bio: user?.bio || ""
  });

  const handleProfileInfoFormChange = (e) => {
    const { name, value } = e.target;
    setProfileInfoForm({
      ...profileInfoForm,
      [name]: value
    });
  }

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();

    const updatedUserDetails = {
      firstName: profileInfoForm.firstName.trim(),
      lastName: profileInfoForm.lastName.trim(),
      favoriteGame: profileInfoForm.favoriteGame.trim(),
      bio: profileInfoForm.bio.trim()
    };

    try {
      await updateUserDBEntry(user, updatedUserDetails);
      setUser({
        ...user,
        ...updatedUserDetails
      });
      setProfileInfoForm(updatedUserDetails);
      handleToast("success", "Profile updated.");
      closeEditForm();
    } catch (e) {
      handleToast("error", e.message);
    }
  }

  return (
    <Surface elevation="elevation-2">
      <h3>Edit Profile</h3>
      <hr />
      <form onSubmit={handleUpdateProfileSubmit}>
        <div className="form__group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={user?.firstName}
            required
            onChange={handleProfileInfoFormChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={user?.lastName}
            required
            onChange={handleProfileInfoFormChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="favoriteGame">Favorite Game:</label>
          <input
            type="text"
            id="favoriteGame"
            name="favoriteGame"
            defaultValue={user?.favoriteGame}
            required
            onChange={handleProfileInfoFormChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            rows="6"
            name="bio"
            defaultValue={user?.bio}
            maxLength={500}
            required
            onChange={handleProfileInfoFormChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </Surface>
  )
}

export default ProfileEdit;