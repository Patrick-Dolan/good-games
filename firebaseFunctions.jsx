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

// Get User data
export const getUserData = async (userId) => {
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

// Check username availability
export const checkUsernameAvailability = async (newUsername) => {
  const users = collection(db, "users");

  const q = query(users, where("displayNameNormalized", "==", newUsername.toLowerCase()));

  const querySnapshot = await getDocs(q);

  if(!querySnapshot.empty) {
    throw new Error("Username is already taken. Please choose a different username.");
  }
}
// Check username validation
export const isUsernameValid = async (newUsername) => {
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

export const updateUserPhoto = async (newPhotoURL) => {
  if (!newPhotoURL) {
    throw new Error("Error updating user: new photo url undefined.");
  }
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
  // Delete old pfp if it exists
  if (user.photoURL !== null) {
    await deleteProfilePictureUserFields(user, setUser);
  }

  if (user.photoPath !== null) {
    await deleteProfilePicture(user);
  }
  // Create filepath for new profile picture
  let filePath = `media/users/${user.uid}/profilepicture/${file.name}`;

  const storageRef = ref(storage, filePath);
  uploadBytes(storageRef, file).then((snapshot) => {
    // Handle successful uploads on complete
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      try {
        // Setup updated user db record and update it
        let payload = {
          photoURL: downloadURL, 
          photoPath: filePath
        }
        updateUserDBEntry(user, payload);
        updateUserPhoto(downloadURL);
        // Set state so site will rerender immediately
        setUser({...user, ...payload});
      } catch (e) {
        throw new Error("Update Error: ", e.message)
      }
    });
  });
}

export const deleteProfilePictureUserFields = async (user, setUser) => {
  try {
    const userDbEntry = doc(db, "users", user.uid);
    
    await updateDoc(userDbEntry, {
      photoPath: deleteField(),
      photoURL: deleteField()
    })

    const updatedUser = {
      ...user,
      photoPath: null,
      photoURL: null
    }
    setUser({...updatedUser});
  } catch (e) {
    throw new Error("Database entry deletion error: ", e.message);
  }
}

export const deleteProfilePicture = async (user) => {
  if (user.photoPath === undefined) { return }
  try {
    console.log(user.photoPath);
    const storageRef = ref(storage, user.photoPath);
    await deleteObject(storageRef);
  } catch (error) {
    throw new Error("Delete file error: ", error.message);
  }
}