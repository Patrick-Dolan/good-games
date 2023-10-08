import "./App.css";
import Games from "./components/games/Games";
import Homepage from "./components/home/Homepage";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router";
import AccountRegisterPage from "./components/pages/AccountRegisterPage";
import AccountSignInPage from "./components/pages/AccountSignInPage";
import Account from "./components/account/Account";
import ProtectedRoute from "./components/account/ProtectedRoute";
import { useState } from "react";
import Toast from "./components/dialogs/Toast";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("error");
  const [toastMessage, setToastMessage] = useState("Unknown error.")

  const handleCloseToast = (): void => {
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
        <Route path="/" element={<Homepage />} />
        <Route path="games" element={<Games />} />
        <Route path="account" element={
            <ProtectedRoute handleUnauthorizedAccess={handleUnauthorizedAccess}>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="account/sign-in" element={<AccountSignInPage />} />
        <Route path="account/new" element={<AccountRegisterPage />} />
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
