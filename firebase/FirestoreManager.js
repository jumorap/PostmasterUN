import { db } from "./firebase.config.js";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

class FirestoreManager {
  static _getUsers = collection(db, "users");
  static _getPosts = collection(db, "posts");
  static _getTags = collection(db, "tags");
  static _getDependencies = collection(db, "dependencies");

  static async addFavorite(postID, userID) {
    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, {
      savedPosts: arrayUnion(postID),
    });
  }

  static async removeFavorite(postID, userID) {
    const userRef = doc(db, "users", userID);
    const succes = await updateDoc(userRef, {
      savedPosts: arrayRemove(postID),
    });
  }

  static async getUsersList() {
    return await getDocs(this._getUsers);
  }

  static async getPostsList(dependencyID) {
    let docs = this._getPosts;
    if (dependencyID) {
      docs = query(this._getPosts, where("type", "==", dependencyID));
    }
    return await getDocs(docs);
  }

  static async getTagsList() {
    return await getDocs(this._getTags);
  }

  static async getDependenciesList() {
    return await getDocs(this._getDependencies);
  }
}

export default FirestoreManager;
