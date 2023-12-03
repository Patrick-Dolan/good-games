import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { auth } from "../../firebase";
import { getUserData } from "../../firebaseFunctions";

export const UserContext = createContext(null);

export const AuthProvider= ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAndMergeUserDbData = async (currentUser) => {
      const dbData = await getUserData(currentUser.uid);
      const updatedUser = {
        ...dbData,
        ...currentUser
      };
      setUser(updatedUser);
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getAndMergeUserDbData(currentUser);
      }
      // TODO Remove console log when done testing conditionals based on user logged in
      console.log(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // TODO look into refactoring to setUser at the end of each operation that changes user data

  const registerUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUsername = async (newUsername) => {
    if (!newUsername) {
      console.log("Error updating user: new username undefined.");
    }
    const updatedInfo = {
      displayName: newUsername || auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL || null
    }

    await updateProfile(auth.currentUser, updatedInfo)
    setUser(prev => ({ ...prev, displayName: newUsername }));
  }

  const updateUserEmail = (newEmail) => {
    return updateEmail(auth.currentUser, newEmail);
  }

  const updateUserPassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  }

  const confirmAuthWithFirebase = async (email, password) => {
    const credentials = EmailAuthProvider.credential(
      email,
      password
    )
    return reauthenticateWithCredential(auth.currentUser, credentials);
  }

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    return signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{ 
        user, 
        setUser, 
        registerUser, 
        updateUsername,
        updateUserEmail,
        updateUserPassword,
        confirmAuthWithFirebase,
        signIn, 
        logout 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const contextValue = useContext(UserContext);
  if (contextValue === null) {
    throw new Error('UserAuth must be used within a UserContextProvider');
  }
  return contextValue;
};
