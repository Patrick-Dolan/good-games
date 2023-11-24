import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Surface from "../layout/Surface";
import { updateUserDBEntry } from "../../../firebaseFunctions";

function RegisterAccount() {
  const { registerUser, updateUsername } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateAndSanitizeFormData = () => {
    setErrorMessage("");
    // Trim all form fields and set those values 
    const tEmail = email.trim();
    const tUsername = username.trim();
    const tPassword = password.trim();
    const tPasswordConfirmation = passwordConfirmation.trim();
    setEmail(prev => prev = tEmail);
    setUsername(prev => prev = tUsername);
    setPassword(prev => prev = tPassword);
    setPasswordConfirmation(prev => prev = tPasswordConfirmation);

    // Check if passwords match
    if (password.trim() != passwordConfirmation.trim()) {
      setErrorMessage("Passwords must match.");
      return true;
    }

    // Check if passwords include spaces
    if (password.includes(" ")) {
      setErrorMessage("Password cannot include spaces.");
      return true;
    }

    // TODO set up function to check username for following restrictions and add here

    // Make sure username only includes alphanumeric characters and/or underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(tUsername)) {
      setErrorMessage("Username can only include letters, numbers, and underscores.");
      return true;
    }

    // Make sure username is at least 4 characters long
    if (tUsername.length <= 3) {
      setErrorMessage("Username must be 4 or more characters long");
      return true;
    }

    return false;
  }

  // TODO add display name availability check

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const failsFormValidation = validateAndSanitizeFormData();
    if (failsFormValidation) { return; }

    try {
      // Create new user with Auth
      const newUser = await registerUser(email.trim(), password.trim());
      // Add user to database
      const userDetails = {
        displayName: username,
        displayNameNormalized: username.toLowerCase(),
        uid: newUser.user.uid
      }
      await updateUserDBEntry(newUser.user, userDetails);
      // Update user auth profile display name
      await updateUsername(username);
      navigate("/");
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <Surface type="surface__auth" elevation="elevation-1">
      <h3>Sign up</h3>
      <p>Already have an account? <Link to={"/account/sign-in"}>Sign in.</Link></p>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input
            required
            type="username"
            placeholder="OneCoolHuman"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            placeholder="totallyAhuman@email.com"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      {errorMessage.length > 0 && (<><p>Error:</p><p>{errorMessage}</p></>)}
    </Surface>
  );
}

export default RegisterAccount;
