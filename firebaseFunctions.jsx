// Firestore
import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, deleteField } from "firebase/firestore";

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

const updateUserPhoto = async (newPhotoURL) => {
  if (!newPhotoURL) {
    throw new Error("Error updating user: new photo url undefined.");
  }
  const updatedInfo = {
    displayName: auth.currentUser?.displayName || null,
    photoURL: newPhotoURL || auth.currentUser?.photoURL
  }

  await updateProfile(auth.currentUser, updatedInfo);
}

// ==================== Firebase Storage Bucket Functions ====================

export const uploadProfilePicture = async (user, setUser, file) => {
  console.log(user);
  // Delete old pfp if it exists
  if (user.photoPath !== null || user.photoURL !== null) {
    await deleteProfilePicture(user);
    await deleteProfilePictureUserFields(user, setUser);
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
  if (user?.photoPath === null) { return }
  try {
    const storageRef = ref(storage, user.photoPath);
    await deleteObject(storageRef);
  } catch (error) {
    throw new Error("Delete file error: ", error.message);
  }
}