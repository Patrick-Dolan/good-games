import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import GamesHomeTab from "../Games/GamesHomeTab";
import MyGamesTab from "../Games/MyGamesTab";
import ShelvesTab from "../shelves/ShelvesTab";

function Tabs() {
  const { user } = useFirebaseAuth();
  const [tab, setTab] = useState("Home");
  const [tabs, setTabs] = useState(["Home", "My Games", "Shelves"]);

  let currentTabComponent = <GamesHomeTab user={user} />;

  switch (tab) {
    case "Home":
      currentTabComponent = <GamesHomeTab user={user} />;
      break;
    case "My Games":
      currentTabComponent = <MyGamesTab shelves={user?.shelves} />;
      break;
    case "Shelves":
      currentTabComponent = <ShelvesTab shelves={user?.shelves} />;
      break;
    default:
      <p className="text-center">Error showing tab.</p>
  }

  return (
    <div>
      <div className="tabs">
        <div className="tabs__button-container">
          {tabs.map((tabName) => (
            <button 
              key={tabName}
              onClick={() => setTab(tabName)}
              disabled={tab === tabName}
              className="tabs__button"
            >
              {tabName}
            </button>
          ))}
        </div>
        <div className="tabs__content">
          {currentTabComponent}
        </div>
      </div>
    </div>
  )
}

export default Tabs;