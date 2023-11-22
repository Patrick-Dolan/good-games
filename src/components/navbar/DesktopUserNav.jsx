import { Link } from "react-router-dom";

function DesktopUserNav({user, handleUserLogout}) {
  return (
    user 
    ? (
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link className="nav__link" to={`user/${user.uid}`}>
            Profile
          </Link>
        </li>
        <li className="nav__list-item">
          <Link className="nav__link" to={"/account/"}>
            Account Settings
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
  )
}

export default DesktopUserNav;