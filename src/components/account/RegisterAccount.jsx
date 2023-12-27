import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Surface from "../layout/Surface";
import { isUsernameValid, updateUserDBEntry } from "../../../firebaseFunctions";

function RegisterAccount() {
  const { registerUser, updateUsername } = useFirebaseAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  });
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const validateFormData = async () => {
    // Check if passwords match
    if (registerForm.password !== registerForm.passwordConfirmation) {
      throw new Error("Passwords must match.");
    }

    // Check if passwords include spaces
    if (registerForm.password.includes(" ")) {
      throw new Error("Password cannot include spaces.");
    }

    await isUsernameValid(registerForm.username);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Trim all form values and set those values
    setRegisterForm(prev => ({
      email: prev.email.trim(),
      username: prev.username.trim(),
      password: prev.password.trim(),
      passwordConfirmation: prev.passwordConfirmation.trim()
    }));

    // TODO figure out a way to handle chain async functions and cleanup in previous functions fail
    try {
      // Validate and sanitize form data
      await validateFormData();
      // Create new user with Auth
      const newUser = await registerUser(registerForm.email, registerForm.password);
      // Add user to database
      const userDetails = {
        displayName: registerForm.username,
        displayNameNormalized: registerForm.username.toLowerCase(),
        uid: newUser.user.uid
      }
      await updateUserDBEntry(newUser.user, userDetails);
      // Update user auth profile display name
      await updateUsername(registerForm.username);
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign up</button>
        {errorMessage.length > 0 && 
          <div className="form__error">
            <p>{errorMessage}</p>
          </div>
        }
      </form>
    </Surface>
  );
}

export default RegisterAccount;
