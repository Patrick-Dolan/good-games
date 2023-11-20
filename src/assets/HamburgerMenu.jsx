const HamburgerMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 24 24"
      style={{display: "flex", alignSelf: "center"}}
      {...props}
    >
      <path
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth={2}
        d="M4 18h16M4 12h16M4 6h16"
      />
    </svg>
  )
}
export default HamburgerMenu;