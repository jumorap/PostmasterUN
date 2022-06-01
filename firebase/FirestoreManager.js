import { db } from "./firebase.config.js"
import { collection, getDocs, query, where  } from "firebase/firestore";


class FirestoreManager {
    static _getUsers = collection(db, "users")
    static _getPosts = collection(db, "posts")
    static _getTags = collection(db, "tags")
    static _getDependencies = collection(db, "dependencies")

    static async getUsersList() {
        return await getDocs(this._getUsers)
    }

    static async getPostsList(dependencyID) {
        let docs = this._getPosts
        if (dependencyID) {
            docs = query(this._getPosts, where("type", "==", dependencyID))
        } 
        return await getDocs(docs)
    }

    static async getTagsList() {
        return await getDocs(this._getTags)
    }

    static async getDependenciesList() {
        return await getDocs(this._getDependencies)
    }
}

export default FirestoreManager
