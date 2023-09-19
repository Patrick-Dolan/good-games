import "./App.css";
import Account from "./components/account/Account";
import Games from "./components/games/Games";
import Homepage from "./components/home/Homepage";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="games" element={<Games />} />
        <Route path="account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
