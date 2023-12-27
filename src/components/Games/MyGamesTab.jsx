import { useEffect, useState } from "react";
import GameListItem from "./GameListItem";

function MyGamesTab({ shelves }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);

  const combineAndFilterGamesFromShelves = () => {
    const combinedGames = [];
    shelves?.forEach((shelf) => {
      shelf.games.forEach((game) => {
        combinedGames.push(game);
      });
    });
    // Filter games so that there are no duplicates
    const filteredGames = combinedGames.filter((game, index, self) => (
      index === self.findIndex((element) => (
        element.id === game.id
      ))
    ));
    return filteredGames;
  }

  useEffect(() => {
    const results = combineAndFilterGamesFromShelves().filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchedGames(results);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // TODO add pagination to search results

  return (
    <div>
      {searchedGames.length > 0 
        ? <p>Games in your lists: {searchedGames.length}</p> 
        : <p>Add games to your lists to see games here.</p>
      }
      <div className="form__group">
        <input
          type="text"
          placeholder="Search..."
          className='mb-1'
          name="search"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchedGames.length > 0 
          ? (
            searchedGames.map((game) => (
              <GameListItem game={game} key={game.id} />
            ))
          )
          : (
            <p>No games found.</p>
          )
        }
      </div>
    </div>
  )
}

export default MyGamesTab;