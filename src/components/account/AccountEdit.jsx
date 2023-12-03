import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import Surface from "../layout/Surface";
import { isUsernameValid, updateUserDBEntry } from "../../../firebaseFunctions";

function AccountEdit({closeEditForm, handleToast}) {
  const { user, updateUserPassword, updateUserEmail, setUser, updateUsername } = useFirebaseAuth();
  const [newEmail, setNewEmail] = useState(user?.email);
  const [newUsername, setNewUsername] = useState(user?.displayName);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleNewUsernameSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrorMessage("");

    try {
      await isUsernameValid(newUsername);
      await updateUsername(newUsername);
      const userDetails = {
        displayName: newUsername.trim(),
        displayNameNormalized: newUsername.trim().toLowerCase()
      }
      await updateUserDBEntry(user, userDetails);
      setUser({
        ...user,
        displayName: newUsername
      });
      handleToast("success", "Username updated.");
      closeEditForm();
    } catch (e) {
      setUsernameErrorMessage(e.message);
    }
  }

  const handleNewEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailErrorMessage("");

    const sanitizedEmail = newEmail.trim().toLowerCase();

    try {
      // Check if email is the same as the current one
      if (user?.email === sanitizedEmail) {
        throw new Error("The new email cannot be the same as the current one. Please choose a different email address.");
      }
      await updateUserEmail(sanitizedEmail);
      setUser({
        ...user,
        email: sanitizedEmail
      });
      handleToast("success", "Email updated.");
      closeEditForm();
    } catch (e) {
      setEmailErrorMessage(e.message);
    }
  }

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrorMessage("");

    try {
      // Check if passwords match
      if (newPassword.trim() !== newPasswordConfirmation.trim()) {
        throw new Error("Passwords must match.");
      }
      await updateUserPassword(newPassword.trim());
      setUser({...user});
      handleToast("success", "Password updated.");
      closeEditForm();
    } catch (e) {
      setPasswordErrorMessage(e.message);
    }
  }

  return (
    <Surface elevation="elevation-2">
      <h3>Edit Account</h3>
      <hr />
      <form onSubmit={handleNewUsernameSubmit}>
        <div className="form__group">
          <label htmlFor="newUsername">Username:</label>
          <input
            type="text"
            id="newUsername"
            name="newUsername"
            defaultValue={user?.displayName}
            required
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <button type="submit">Update Username</button>
        {usernameErrorMessage.length > 0 && 
          <div className="form__error">
            <p>{usernameErrorMessage}</p>
          </div>
        }
      </form>
      <form onSubmit={handleNewEmailSubmit}>
        <div className="form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user?.email}
            required
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button type="submit">Update email</button>
        {emailErrorMessage.length > 0 && 
          <div className="form__error">
            <p>{emailErrorMessage}</p>
          </div>
        }
      </form>
      <form onSubmit={handleNewPasswordSubmit}>
        <div className="form__group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="*********"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="*********"
            required
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">Update Password</button>
        {passwordErrorMessage.length > 0 && 
          <div className="form__error">
            <p>{passwordErrorMessage}</p>
          </div>
        }
      </form>
    </Surface>
  )
}

export default AccountEdit;