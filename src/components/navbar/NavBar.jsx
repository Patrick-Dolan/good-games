import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HamburgerMenu from "../../assets/HamburgerMenu";
import CloseIcon from "../../assets/CloseIcon";

function NavBar() {
  const { user, logout } = useFirebaseAuth();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateScreenSize = () => {
      setShowMobileNav(false);
      setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', updateScreenSize);
    
    return(() => {
      window.removeEventListener('resize', updateScreenSize);
    });
  });

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
        {(screenSize < 800) 
          ? (
            showMobileNav 
            ? (
              user ? (
                <>
                  <div className="mobile-nav">
                    <div className="close-icon-row">
                      <CloseIcon className="close-icon" onClick={() => setShowMobileNav(false)}></CloseIcon>
                    </div>
                    <ul className="mobile-nav__list">
                      <li className="mobile-nav__list-item" onClick={() => setShowMobileNav(false)}>
                        <Link className="nav__link" to={"/account/"}>
                          Account
                        </Link>
                      </li>
                      <li className="mobile-nav__list-item" onClick={() => setShowMobileNav(false)}>
                        <Link className="nav__link" onClick={handleUserLogout} to={"/"}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div id="hamburger-shader" onClick={() => setShowMobileNav(false)}></div>
                </>
              ) : (
                <>
                  <div className="mobile-nav">
                    <div className="close-icon-row">
                      <CloseIcon className="close-icon" onClick={() => setShowMobileNav(false)}></CloseIcon>
                    </div>
                    <ul className="mobile-nav__list">
                      <li className="mobile-nav__list-item" onClick={() => setShowMobileNav(false)}>
                        <Link className="nav__link" to={"/account/sign-in"}>
                          Sign in
                        </Link>
                      </li>
                      <li className="mobile-nav__list-item" onClick={() => setShowMobileNav(false)}>
                        <Link className="nav__link" to={"/account/new"}>
                          Sign up
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )
            )
            : (
              <div 
                className="hamburger-menu" 
                onClick={() => setShowMobileNav(true)}
              >
                <HamburgerMenu /> 
              </div>
            )
          )
          : (
            user 
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
          )
        }
      </nav>
    </header>
  );
}

export default NavBar;
