// Firestore
import { db } from "./firebase";
import { 
  doc, 
  collection, 
  getDoc, 
  getDocs, 
  setDoc, 
  serverTimestamp, 
  updateDoc, 
  deleteField, 
  query, 
  where,
  orderBy,
  limit
} from "firebase/firestore";

// Storage bucket
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Auth
import { auth } from "./firebase";
import { updateProfile } from "firebase/auth";

// UUID
import { v4 as uuidv4 } from "uuid";

// ==================== Firestore Functions ====================

// ====== User Functions ======

// Add or Update takes in user from auth and userDetails object
export const updateUserDBEntry = async (user, userDetails) => {
  if (!user) { throw new Error("Error updating user: user undefined."); }
  // Create Account doc for new user with same user id
  const docRef = doc(db, "users", user.uid );
  const updatedUser = {
    createdAt: user?.createdAt || serverTimestamp(),
    shelves: user?.shelves || [
      {name: "Playing", games: [], protected: true, id: uuidv4()},
      {name: "Completed", games: [], protected: true, id: uuidv4()},
      {name: "Want to play", games: [], protected: true, id: uuidv4()},
      {name: "Favorites", games: [], protected: true, id: uuidv4()},
    ],
    ...userDetails
  }
  await setDoc(docRef, updatedUser, { merge: true });
}

// Get User data
export const getUserData = async (userId) => {
  if (!userId) { throw new Error("Error getting user: userId undefined."); }
  if (userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No document found.");
    }
  }
}

export const getUserDataByShelfId = async (shelfId) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let user = null;
  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const shelfExists = userData.shelves.some((shelf) => shelf.id === shelfId);
    if (shelfExists) {
      user = userData;
      return;
    }
  });
  return user;
}

// Check username availability
export const checkUsernameAvailability = async (newUsername) => {
  if (!newUsername) { throw new Error("Error checking username availability: newUsername undefined."); }

  const users = collection(db, "users");

  const q = query(users, where("displayNameNormalized", "==", newUsername.toLowerCase()));

  const querySnapshot = await getDocs(q);

  if(!querySnapshot.empty) {
    throw new Error("Username is already taken. Please choose a different username.");
  }
}

// Check username validation
export const isUsernameValid = async (newUsername) => {
  if (!newUsername) { throw new Error("Error checking username validation: newUsername undefined."); }

  // Make sure new username isn't the same as the old one
  if (auth?.currentUser?.displayName === newUsername) {
    throw new Error("Username cannot be the same as the current one. Please choose a different username.");
  }

  // Make sure username only includes alphanumeric characters and/or underscores
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(newUsername)) {
    throw new Error("Username can only include letters, numbers, and underscores.");
  }

  // Make sure username is at least 4 characters long
  if (newUsername.length <= 3) {
    throw new Error("Username must be 4 or more characters long");
  }
  await checkUsernameAvailability(newUsername);
}

const updateUserPhoto = async (newPhotoURL) => {
  if (!newPhotoURL) { throw new Error("Error updating user: new photo url undefined."); }

  const updatedInfo = {
    displayName: auth.currentUser?.displayName || null,
    photoURL: newPhotoURL || auth.currentUser?.photoURL
  }

  await updateProfile(auth.currentUser, updatedInfo);
}

// ====== Discovery Page Functions ======

export const getTenHighestRatedGames = async () => {
  const games = collection(db, "games");
  const q = query(games, orderBy("metacriticScore", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  const highestRatedGames = [];
  querySnapshot.forEach((doc) => {
    highestRatedGames.push(doc.data());
  });
  return highestRatedGames;
}

// ==================== Firebase Storage Bucket Functions ====================

export const uploadProfilePicture = async (user, setUser, file) => {
  if (!file) { throw new Error("Upload Error: No file selected."); }

  // Delete old profile picture if it exists
  if (user.photoURL !== null) {
    await deleteProfilePictureUserFields(user, setUser);
  }

  if (user.photoPath !== null) {
    await deleteProfilePicture(user);
  }

  // Create filepath for new profile picture
  const filePath = `media/users/${user.uid}/profilepicture/${file.name}`;
  const storageRef = ref(storage, filePath);

  try {
    // Upload the file to storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update user database record and profile photo
    const payload = {
      photoURL: downloadURL,
      photoPath: filePath
    };
    await updateUserDBEntry(user, payload);
    await updateUserPhoto(downloadURL);

    // Update user state
    setUser({ ...user, ...payload });
  } catch (error) {
    throw new Error("Upload Error: " + error.message);
  }
};

export const deleteProfilePictureUserFields = async (user, setUser) => {
  if (!user) { throw new Error("Delete database entry error: user undefined."); }
  if (!setUser) { throw new Error("Delete database entry error: setUser undefined."); }

  try {
    const userDbEntry = doc(db, "users", user.uid);
    
    await updateDoc(userDbEntry, {
      photoPath: deleteField(),
      photoURL: deleteField()
    });

    const updatedUser = {
      ...user,
      photoPath: null,
      photoURL: null
    };
    setUser({ ...updatedUser });
  } catch (e) {
    throw new Error("Database entry deletion error: " + e.message);
  }
};

export const deleteProfilePicture = async (user) => {
  if (!user) { throw new Error("Delete file error: user undefined."); }
  if (user.photoPath === undefined) { return }
  try {
    const storageRef = ref(storage, user.photoPath);
    await deleteObject(storageRef);
  } catch (error) {
    throw new Error("Delete file error: ", error.message);
  }
}