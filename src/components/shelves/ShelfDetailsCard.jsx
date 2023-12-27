function ShelfDetailsCard({ shelf }) {
  const randomIndex = Math.floor(Math.random() * shelf.games.length);
  const randomGame = shelf.games[randomIndex];

  return (
    <div 
      className="shelf__details-card" 
      style={{
        backgroundImage: `url(${randomGame?.backgroundImage})`, 
        objectFit: "cover", 
        backgroundSize: "cover", 
        backgroundPosition: "top center"
      }}
    >
      <div className="shelf__details-card--overlay">
        <h3>{shelf.name}</h3>
        <p>{shelf.games.length} games</p>
      </div>
    </div>
  )
}

export default ShelfDetailsCard;