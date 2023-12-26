import Surface from "../layout/Surface";

function ShelfDetailCard({ shelf }) {
  return (
    <div className="mb-1">
      <Surface>
        <h3>{shelf.name}</h3>
        <p>{shelf.games.length} games</p>
      </Surface>
    </div>
  )
}

export default ShelfDetailCard;