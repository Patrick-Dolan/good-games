import "./App.css";
import Games from "./components/games/Games";
import Homepage from "./components/home/Homepage";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router";
import AccountRegisterPage from "./components/pages/AccountRegisterPage";
import AccountSignInPage from "./components/pages/AccountSignInPage";
import Account from "./components/account/Account";
import ProtectedRoute from "./components/account/ProtectedRoute";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="games" element={<Games />} />
        <Route path="account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } 
        />
        <Route path="account/sign-in" element={<AccountSignInPage />} />
        <Route path="account/new" element={<AccountRegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
