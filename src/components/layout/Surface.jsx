function Surface({children, type, elevation}) {
  return (
    <div className={`surface shadow ${elevation ? elevation : ""} ${type ? type : ""}`}>
      <div className="surface-container">
        {children}
      </div>
    </div>
  )
}

export default Surface;