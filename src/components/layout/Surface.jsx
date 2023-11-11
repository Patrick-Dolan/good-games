function Surface({children, type}) {
  return (
    <div className={`surface shadow elevation-1 ${type}`}>
      <div className="surface-container">
        {children}
      </div>
    </div>
  )
}

export default Surface;