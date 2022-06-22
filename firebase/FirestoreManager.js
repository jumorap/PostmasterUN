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
  setDoc,
} from "firebase/firestore";
import StorageManager from "./StorageManager.js";

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
    const tags = [];
    const docs = await getDocs(this._getTags);
    docs.forEach((doc) => {
      tags.push(doc.data());
    });
    return tags;
  }

  static async getDependenciesList() {
    return await getDocs(this._getDependencies);
  }

  static async getTagsByDependency(dependency_id) {
    if (dependency_id === null) {
      return await this.getTagsList();
    }

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
    let q;
    if (dependency_id) {
      q = query(
        this._getPosts,
        where("type", "==", dependency_id),
        where("tags", "array-contains-any", tagList)
      );
    } else {
      q = query(this._getPosts, where("tags", "array-contains-any", tagList));
    }

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  }

  static async updateTag(tag, dependency_id) {
    //get all the tags with the same name and dependency ID
    const q = query(this._getTags, where("name", "==", tag));
    const data = await getDocs(q);
    //extract the data
    const tags = [];
    data.forEach((doc) => {
      tags.push({ data: doc.data, id: doc.id });
    });
    if (tags.length === 0) {
      // if the tag does exist it is created
      await addDoc(this._getTags, { name: tag, dependency_id, uses: 1 });
    }
  }

  /**
   *
   * @param {List[tag]} tagList tag with the form {name: "name_here"}
   * @param {*} dependency_id
   */
  static async updateTags(tagList, dependency_id) {
    tagList.forEach((tag) => {
      this.updateTag(tag, dependency_id);
    });
  }

  static async addPost(title, tags, links, description, dependency_id, files) {
    //create a reference to the new Post
    const postRef = doc(this._getPosts);
    //upload the images
    const images = await StorageManager.uploadImages(files, postRef.id);
    //prepare the new post for upload
    const procesed_tags = tags.map((t) => t.name);
    const newPost = {
      title,
      tags: procesed_tags,
      links,
      description,
      type: dependency_id,
      images: images,
    };
    //upload the new post
    const docRef = await setDoc(postRef, newPost);
    //add the tags
    await this.updateTags(procesed_tags, dependency_id);
  }
}

export default FirestoreManager;
