import { Link } from "react-router-dom";
import CloseIcon from "../../assets/CloseIcon";

function MobileUserNav({user, closeMobileUserNav, handleUserLogout}) {
  return (
    user ? (
      <>
        <div className="mobile-nav shadow">
          <div className="close-icon-row">
            <CloseIcon className="close-icon" onClick={() => closeMobileUserNav()}></CloseIcon>
          </div>
          <ul className="mobile-nav__list">
            <li className="mobile-nav__list-item" onClick={() => closeMobileUserNav()}>
              <Link className="nav__link" to={"/account/"}>
                Account
              </Link>
            </li>
            <li className="mobile-nav__list-item" onClick={() => closeMobileUserNav()}>
              <Link className="nav__link" onClick={handleUserLogout} to={"/"}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <div id="hamburger-shader" onClick={() => closeMobileUserNav()}></div>
      </>
    ) : (
      <>
        <div className="mobile-nav shadow">
          <div>
            <div className="close-icon-row">
              <CloseIcon className="close-icon" onClick={() => closeMobileUserNav()}></CloseIcon>
            </div>
            <ul className="mobile-nav__list">
              <li className="mobile-nav__list-item" onClick={() => closeMobileUserNav()}>
                <Link className="nav__link" to={"/account/sign-in"}>
                  Sign in
                </Link>
              </li>
              <li className="mobile-nav__list-item" onClick={() => closeMobileUserNav()}>
                <Link className="nav__link" to={"/account/new"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div id="hamburger-shader" onClick={() => closeMobileUserNav()}></div>
      </>
    )
  )
}

export default MobileUserNav;