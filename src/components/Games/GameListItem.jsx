import { useNavigate } from "react-router-dom";

function GameListItem({ game }) {
  const navigate = useNavigate();

  return (
    <div className="game-list__item" onClick={() => navigate(`/games/${game.id}`, { state: game })}>
      <div className="game-list__item-container">
        <img className="game-list__item-image" src={game.backgroundImage} alt={game.name} />
        <p>{game.name}</p>
      </div>
    </div>
  )
}

export default GameListItem;