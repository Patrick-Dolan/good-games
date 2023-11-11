import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <header className="elevation-2 shadow">
      <nav className="container row">
        <div className="nav__left">
          <h1 className="nav__logo">GG</h1>
          <ul className="nav__list">
            <li className="nav__list-item">
              <Link className="nav__link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav__list-item">
              <Link className="nav__link" to={"/games"}>
                Games
              </Link>
            </li>
          </ul>
        </div>
          {user 
            ? (
              <ul className="nav__list">
                <li className="nav__list-item">
                  <Link className="nav__link" to={"/account/"}>
                    Account
                  </Link>
                </li>
                  <li className="nav__list-item">
                    <Link className="nav__link nav__link-button" onClick={handleUserLogout} to={"/"}>
                      Logout
                    </Link>
                  </li>
              </ul>
            )
            : (
              <ul className="nav__list">
                <li className="nav__list-item">
                  <Link className="nav__link" to={"/account/sign-in"}>
                    Sign in
                  </Link>
                </li>
                <li className="nav__list-item">
                  <Link className="nav__link nav__link-button" to={"/account/new"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            )
          }
          
      </nav>
    </header>
  );
}

export default NavBar;
