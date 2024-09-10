
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getUser(userId) {
  try {
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser(userId, updates) {
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, updates);
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    console.log("User data deleted successfully!");
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
}
