import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <header>
        <nav className="container row">
          <div className="nav__left">
            <h1>GG</h1>
            <ul className="nav__list">
              <li>
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
          <ul className="nav__list">
            <li className="nav__list-item">
              <Link className="nav__link nav__link-button" to={"/account"}>
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
