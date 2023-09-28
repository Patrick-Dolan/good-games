import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { auth } from "./../../firebase";

interface User {
  uid: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

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

  const registerUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email: string, password: string) => {
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

export const UserAuth = () => {
  const contextValue = useContext(UserContext);
  if (contextValue === null) {
    throw new Error('UserAuth must be used within a UserContextProvider');
  }
  return contextValue;
};
