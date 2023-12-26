import ShelfDetailCard from "./ShelfDetailCard";

function ShelvesTab({ shelves }) {
  return (
    <div>
      {shelves 
        ? (
          shelves.map((shelf) => 
            <ShelfDetailCard shelf={shelf} key={shelf.id} />
          )
        )
        : (
          <p>No shelves.</p>
        )
      }
    </div>
  )
}

export default ShelvesTab;