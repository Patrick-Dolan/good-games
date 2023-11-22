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
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { auth } from "../../firebase";
import { getUserData } from "../../firestoreFunctions";

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
  }

  const updateUserPhoto = async (newPhotoURL) => {
    if (!newPhotoURL) {
      console.log("Error updating user: new photo url undefined.")
    }
    const updatedInfo = {
      displayName: auth.currentUser?.displayName || null,
      photoURL: newPhotoURL || auth.currentUser?.photoURL
    }

    await updateProfile(auth.currentUser, updatedInfo)
  }

  const confirmAuthWithFirebase = async (email, password) => {
    const credentials = EmailAuthProvider.credential(
      email,
      password
    )
    return reauthenticateWithCredential(auth.currentUser, credentials)
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
        updateUserPhoto,
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
