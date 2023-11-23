import { useState } from "react";
import Surface from "../layout/Surface";
import { useFirebaseAuth } from "../../context/AuthContext";
import { updateUserDBEntry } from "../../../firestoreFunctions";

function ProfileEdit({closeEditForm, handleToast}) {
  const { user, setUser } = useFirebaseAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [bio, setBio] = useState("");

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();

    // TODO Sanitize inputs before updating database

    const updatedUserDetails = {
      firstName: firstName || user?.firstName,
      lastName: lastName || user?.lastName,
      favoriteGame: favoriteGame || user?.favoriteGame,
      bio: bio || user?.bio
    };

    try {
      await updateUserDBEntry(user, updatedUserDetails);
      handleToast("success", "Profile updated.");
      setUser({
        ...user,
        ...updatedUserDetails
      });
      closeEditForm();
    } catch (e) {
      handleToast("error", e.message);
    }

    console.log("Update profile submitted.");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Favorite Game:", favoriteGame);
    console.log("Bio:", bio);
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
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setFavoriteGame(e.target.value)}
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
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </Surface>
  )
}

export default ProfileEdit;