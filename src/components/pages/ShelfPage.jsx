import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUserDataByShelfId } from "../../../firebaseFunctions";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../assets/LoadingAnimation";
import Surface from "../layout/Surface";
import GameListItem from "../Games/GameListItem";
import Image from "../image-manipulation/Image";

function ShelfPage() {
  const { shelfId } = useParams();
  const [user, setUser] = useState(null);
  const [shelf, setShelf] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserDataByShelfId(shelfId);
      const shelfExists = user.shelves.some(shelf => shelf.id === shelfId);
      if (shelfExists) {
        setUser(user);
        setShelf(user.shelves.find(shelf => shelf.id === shelfId));
        setLoaded(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
      {loaded 
        ? (
          <Surface>
            <h1 className="mb-1r">{shelf.name}</h1>
            <p className="profile-card--label">Shelf created by:</p>
            <Link to={`/user/${user.uid}`} className="profile-card--link">
              <div className="profile-card mb-1r">
                <Image
                  url={user.photoURL}
                  classes="profile-picture--small-round"
                  loadClasses="loading-image--small profile-picture--loading"
                />
                <p>@{user.displayName}</p>
              </div>
            </Link>
            <p className="profile-card--label">Description:</p>
            <p className="profile-card--description">{shelf?.description ? shelf.description : "No description available."}</p>
            <hr />
            {shelf?.games 
              ? (
                shelf.games.map((game) => (
                  <GameListItem game={game} key={game.id} />
                ))
              ) 
              : (
                <p>No games in shelf.</p>
              )
            }
          </Surface>
        ) 
        : (
          <Surface>
            <LoadingAnimation />
            <h3 className="text-center">Shelf Loading...</h3>
          </Surface>
        )
      }
    </div>
  )
}

export default ShelfPage;