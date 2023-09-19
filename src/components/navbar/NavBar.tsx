function NavBar() {
  return (
    <>
      <header>
        <nav className="container row">
          <div className="nav__left">
            <h1>GG</h1>
            <ul className="nav__list">
              <li>
                <a
                  href="#"
                  className="nav__link"
                  onClick={() => alert("Home Clicked")}
                >
                  Home
                </a>
              </li>
              <li className="nav__list-item">
                <a
                  href="#"
                  className="nav__link"
                  onClick={() => alert("Games Clicked")}
                >
                  Games
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav__list">
            <li className="nav__list-item">
              <a
                href="#"
                className="nav__link nav__link-button"
                onClick={() => alert("Account Clicked")}
              >
                Account
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
