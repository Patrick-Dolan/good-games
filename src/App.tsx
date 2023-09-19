import "./App.css";
import Account from "./components/account/Account";
import Games from "./components/games/Games";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Games />
      <Account />
    </>
  );
}

export default App;
