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
} from "firebase/auth";
import { auth } from "../../firebase";

export const UserContext = createContext(null);

export const AuthProvider= ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid) {
        setUser(currentUser);
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

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    return signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, signIn, logout }}
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
