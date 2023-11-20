const HamburgerMenu = (props) => {
  const { openMobileUserNav } = props;
  return (
    <div 
      className="hamburger-menu" 
      onClick={() => openMobileUserNav()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill="none"
        viewBox="0 0 24 24"
        style={{display: "flex", alignSelf: "center"}}
      >
        <path
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth={2}
          d="M4 18h16M4 12h16M4 6h16"
        />
      </svg>
    </div>
  )
}
export default HamburgerMenu;