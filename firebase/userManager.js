import React from "react";
import { db } from "./firebase.config.js"
import FirestoreManager from "./FirestoreManager";
import { dataQueryById } from "./dataQuery";
import { collection, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";

//Read one user from database

export async function getUser(userID) {
    const docRef = doc(db, "users", userID)
    const user = await getDoc(docRef)

    if (user.exists()) {
      return user
    } else {
      return null
    }
}

export async function getUserByEmail(email) {
  const docRef = collection(db, "users")
  const q = query(docRef, where("email", "==", email ));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {

    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());

    return doc.data()
  });
}

/**
 * Function that rectifies the data of the user -> if is a UNAL user, it will return true, if not, it will return false
 * @param user - user data
 * @returns {boolean} - true if is a UNAL user, false if not
 */
export function getUserUnalAuth(user) {
    return !!user.email.toString().split('@')[1].includes('unal.edu.co')
}

/**
 * Read all users from database and generate an array of users id.
 * With this, will check if the user is already in the database.
 * if not, will create a new user.
 * @param user The user to check if is in the database.
 * @returns {Promise<void>}
 */
export async function createUser(user) {
    // get full users data from firebase and store it as a list
    const usersListById = await dataQueryById(FirestoreManager.getUsersList())

    // The usersListById have and id object, these ids are collected in an array
    const usersListIds = usersListById.map(user => user.id)

    // Check if the userID is already in the usersListIds
    // If it is false, the userID is used to create a new user state with "estudiante" as role
    // With this, the date of the creation is stored in the database
    if (!usersListIds.includes(user.uid) && getUserUnalAuth(user)) {
        const userGen = doc(db, "users", user.uid);
        setDoc(userGen, {
            nombre: user.displayName,
            email: user.email,
            id: user.uid,
            rol: ["estudiante"],
            creationDate: new Date(),
        })
    }
}
