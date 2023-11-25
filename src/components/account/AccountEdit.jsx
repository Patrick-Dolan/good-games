import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import Surface from "../layout/Surface";
import { updateUserDBEntry } from "../../../firebaseFunctions";

function AccountEdit({closeEditForm, handleToast}) {
  const { user, updateUserPassword, updateUserEmail, setUser, updateUsername } = useFirebaseAuth();
  const [newEmail, setNewEmail] = useState(user?.email);
  const [newUsername, setNewUsername] = useState(user?.displayName);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const checkPasswords = () => {
    const trimmedPassword = newPassword.trim();
    const trimmedPasswordConfirmation = newPasswordConfirmation.trim();

    if (trimmedPassword !== trimmedPasswordConfirmation) {
      setPasswordErrorMessage("Passwords must match.");
      return false;
    }

    return true;
  }

  const handleNewUsernameSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrorMessage(prev => prev = "");

    // TODO set up function to check username for following restrictions and add here
    // TODO add a toast to let user know when things error or success

    // Make sure new username isn't the same as the old one
    if (user?.displayName === newUsername) {
      setUsernameErrorMessage("Username cannot be the same as the current one. Please choose a different username.");
      return;
    }

    // Make sure username only includes alphanumeric characters and/or underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(newUsername)) {
      setUsernameErrorMessage("Username can only include letters, numbers, and underscores.");
      return;
    }

    // Make sure username is at least 4 characters long
    if (newUsername.length <= 3) {
      setUsernameErrorMessage("Username must be 4 or more characters long");
      return;
    }

    try {
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
      closeEditForm();
    } catch (e) {
      setUsernameErrorMessage(e.message);
    }
  }

  const handleNewEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailErrorMessage(prev => prev = "");

    if (user?.email === newEmail.trim()) {
      setEmailErrorMessage("The new email cannot be the same as the current one. Please choose a different email address.");
      return;
    }

    try {
      await updateUserEmail(newEmail.trim());
      handleToast("success", "Email updated.");
      setUser({
        ...user,
        email: newEmail.trim()
      });
      closeEditForm();
    } catch (e) {
      setEmailErrorMessage(e.message);
    }
  }

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrorMessage(prev => prev = "");

    const passwordAcceptable = checkPasswords();
    if (!passwordAcceptable) { return }

    try {
      await updateUserPassword(newPassword);
      handleToast("success", "Password updated.");
      setUser({...user});
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
          <div className="error-box">
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
          <div className="error-box">
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
          <div className="error-box">
            <p>{passwordErrorMessage}</p>
          </div>
        }
      </form>
    </Surface>
  )
}

export default AccountEdit;