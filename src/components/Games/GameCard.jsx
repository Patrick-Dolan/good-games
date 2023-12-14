import { Link } from "react-router-dom";
import Image from "../image-manipulation/Image";
import Surface from "../layout/Surface";

function GameCard({ game }) {

  return (
    <div className="mb-1">
      <Surface>
        <Image url={game.backgroundImage} alt={game.name} classes="mb-1" />
        <h3>{game.name}</h3>
        <div className="row">
          <p>MetaCritic: {game.metacriticScore}</p>
          {game.esrbRating && <p>ESRB: {game.esrbRating}</p>}
        </div>
        <Link to={`/games/${game.id}`} state={game} className="">
          <button>Details</button>
        </Link>
      </Surface>
    </div>
  );
};

export default GameCard;
