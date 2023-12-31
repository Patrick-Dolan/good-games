import "./App.css";
import MyGamesPage from "./components/pages/MyGamesPage";
import HomePage from "./components/pages/Homepage";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router";
import AccountRegisterPage from "./components/pages/AccountRegisterPage";
import AccountSignInPage from "./components/pages/AccountSignInPage";
import AccountPage from "./components/pages/AccountPage";
import ProtectedRoute from "./components/account/ProtectedRoute";
import { useState } from "react";
import Toast from "./components/dialogs/Toast";
import ProfilePage from "./components/pages/ProfilePage";
import DiscoveryPage from "./components/pages/DiscoverPage";
import RouteNotFoundPage from "./components/pages/RouteNotFoundPage";
import GamesPage from "./components/pages/GamesPage";
import TestPage from "./components/pages/TestPage";
import AboutPage from "./components/pages/AboutPage";
import ShelfPage from "./components/pages/ShelfPage";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("error");
  const [toastMessage, setToastMessage] = useState("Unknown error.")

  const handleCloseToast = () => {
    setShowToast(false);
  }
  const handleUnauthorizedAccess = () => {
    setShowToast(true);
    setToastType("info");
    setToastMessage("You must be logged in to view this page.");
  }

  const handleToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="my-games" element={<MyGamesPage />} />
        <Route path="games/:gameId" element={<GamesPage />} />
        <Route path="shelves/:shelfId" element={<ShelfPage handleToast={handleToast} />} />
        <Route path="discover" element={<DiscoveryPage />} />
        <Route path="account" element={
            <ProtectedRoute handleUnauthorizedAccess={handleUnauthorizedAccess}>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route path="account/sign-in" element={<AccountSignInPage />} />
        <Route path="account/new" element={<AccountRegisterPage />} />
        <Route path="user/:userId" element={<ProfilePage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<RouteNotFoundPage />} />
      </Routes>
      <Toast 
        onCloseToast={handleCloseToast} 
        show={showToast} 
        message={toastMessage} 
        type={toastType}      
      />
    </>
  );
}

export default App;
