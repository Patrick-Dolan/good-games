import Surface from "./Surface";

function GameCard({ game }) {

  return (
    <div className="mb-1">
      <Surface>
        <img src={game.backgroundImage} alt={game.name} className="mb-1" />
        <h3>{game.name}</h3>
        <p>MetaCritic rating: {game.metacriticScore}</p>
        {game.esrbRating && <p>ESRB: {game.esrbRating}</p>}
      </Surface>
    </div>
  );
};

export default GameCard;
