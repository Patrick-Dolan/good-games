import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HamburgerMenu from "../../assets/HamburgerMenu";
import MobileUserNav from "./MobileUserNav";
import DesktopUserNav from "./DesktopUserNav";

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

  const handleOpenMobileUserNav = () => {
    setShowMobileNav(true);
  }

  const handleCloseMobileUserNav = () => {
    setShowMobileNav(false);
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
              <MobileUserNav 
                user={user} 
                closeMobileUserNav={handleCloseMobileUserNav} 
                handleUserLogout={handleUserLogout}
              />
            )
            : (
              <HamburgerMenu 
                openMobileUserNav={handleOpenMobileUserNav}
              /> 
            )
          )
          : (
            <DesktopUserNav
              user={user}
              handleUserLogout={handleUserLogout}
            />
          )
        }
      </nav>
    </header>
  );
}

export default NavBar;
