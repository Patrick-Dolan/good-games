import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";

function ConfirmAuth({setAuthVerified}) {
  const { confirmAuthWithFirebase } = useFirebaseAuth();
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmAuthWithFirebase(confirmEmail.trim(), confirmPassword.trim());
      setAuthVerified(true);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="confirmEmail">Email:</label>
          <input
            type="email"
            placeholder="totallyAhuman@email.com"
            id="confirmEmail"
            name="confirmEmail"
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="confirmPassword">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      {error.length > 0 && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default ConfirmAuth;