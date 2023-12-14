import { useLocation } from "react-router";
import GameDetails from "../Games/GameDetails";
import Surface from "../layout/Surface";

function GamesPage() {
  const { state } = useLocation();

  return (
    <div className="container">
      <Surface elevation="elevation-1" >
        <GameDetails game={state} />
      </Surface>
    </div>
  )
}

export default GamesPage;