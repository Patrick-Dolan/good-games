import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";


// ==================== Firestore Functions ====================

// ====== User Functions ======

// Add or Update takes in user from auth and userDetails object
export const updateUserDBEntry = async (user, userDetails) => {
  // Create Account doc for new user with same user id
  const docRef = doc(db, "users", user.uid );
  const payload = {
    ...userDetails,
    createdAt: user.createdAt || serverTimestamp()
  }
  await setDoc(docRef, payload, { merge: true });
}