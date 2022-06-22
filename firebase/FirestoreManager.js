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
  deleteDoc,
  addDoc,
} from "firebase/firestore";

class FirestoreManager {
  static _getUsers = collection(db, "users");
  static _getPosts = collection(db, "posts");
  static _getTags = collection(db, "tags");
  static _getDependencies = collection(db, "dependencies");

  static async deletePost(postID) {
    const postRef = doc(db, "posts", postID);
    await deleteDoc(postRef);
  }

  static async _getFavoritePostsIDs(userID) {
    const userRef = doc(db, "users", `${userID}`);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();
    const savedPosts = data.savedPosts || [];
    return savedPosts;
  }

  static async getFavoritePosts(userID) {
    const posts = [];
    const postIDs = await this._getFavoritePostsIDs(userID);
    for (let i = 0; i < postIDs.length; i++) {
      const post = await getDoc(doc(db, "posts", postIDs[i]));

      posts.push({ ...post.data(), id: postIDs[i] });
    }
    return posts;
  }

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

  static async getTags(dependency_id) {
    const tags = [];
    const q = query(this._getTags, where("dependency_id", "==", dependency_id));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      tags.push(doc.data());
    });
    return tags;
  }

  static async filterPosts(tagList, dependency_id) {
    const posts = [];

    const q = query(
      this._getPosts,
      where("type", "==", dependency_id),
      where("tags", "array-contains-any", tagList)
    );
    
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  }


  static async addPost(title, tags, links, description, dependency_id){
    const procesed_tags = tags.map((t)=>t.name)
    const newPost = {title, tags: procesed_tags, links, description, type: dependency_id}
    //const docRef = await addDoc(this._getPosts, newPost)
    console.log(newPost)
  }

}

export default FirestoreManager;
