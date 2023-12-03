import Surface from "../layout/Surface";
import { useFirebaseAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const { signIn } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Surface type="surface__auth" elevation="elevation-1">
      <h3>Sign in</h3>
      <p>Don't have an account? <Link to={"/account/new"}>Sign up.</Link></p>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="totallyAhuman@email.com"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in</button>
        {error.length > 0 && 
          <div className="form__error">
            <p>{error}</p>
          </div>
        }
      </form>
    </Surface>
  );
}

export default SignIn;
