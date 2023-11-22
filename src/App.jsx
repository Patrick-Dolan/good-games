import "./App.css";
import Games from "./components/games/Games";
import HomePage from "./components/home/Homepage";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router";
import AccountRegisterPage from "./components/pages/AccountRegisterPage";
import AccountSignInPage from "./components/pages/AccountSignInPage";
import AccountPage from "./components/account/AccountPage";
import ProtectedRoute from "./components/account/ProtectedRoute";
import { useState } from "react";
import Toast from "./components/dialogs/Toast";
import ProfilePage from "./components/user/Profilepage";

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

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="games" element={<Games />} />
        <Route path="account" element={
            <ProtectedRoute handleUnauthorizedAccess={handleUnauthorizedAccess}>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route path="account/sign-in" element={<AccountSignInPage />} />
        <Route path="account/new" element={<AccountRegisterPage />} />
        <Route path="user/:userId" element={<ProfilePage />} />
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
