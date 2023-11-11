import { FormEvent, useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Surface from "../layout/Surface";

function RegisterAccount() {
  const { registerUser } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    if (password.trim() != passwordConfirmation.trim()) {
      setError("Error: Passwords must match.");
      return;
    }

    try {
      await registerUser(email, password);
      navigate("/");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Surface type="surface__auth">
      <h3>Sign up</h3>
      <p>Already have an account? <Link to={"/account/sign-in"}>Sign in.</Link></p>
      <form onSubmit={handleSubmit}>
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
