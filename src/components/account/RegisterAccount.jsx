import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Surface from "../layout/Surface";
import { updateUserDBEntry } from "../../../firestoreFunctions";

function RegisterAccount() {
  const { registerUser, updateUsername } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // TODO Sanitize data from form before updating backend
    if (password.trim() != passwordConfirmation.trim()) {
      setError("Error: Passwords must match.");
      return;
    }

    try {
      // Create new user with Auth
      const newUser = await registerUser(email, password);
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
      setError(e.message);
    }
  };

  return (
    <Surface type="surface__auth">
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
        <button type="submit" className="form__button">Sign up</button>
      </form>
      {error.length > 0 && (<><p>Error:</p><p>{error}</p></>)}
    </Surface>
  );
}

export default RegisterAccount;
